import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Fab,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';

import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  imageUsers: {
    height: 50,
    width: 50,
    borderRadius: '50%',
  },
  iconBack: {
    marginRight: 15,
  },
}));

interface User {
  id: number;
  name: string;
  code: string;
  birth: Date;
  photo: string;
}

const UserList: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [listUsers, setListUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    getListUsers();
  }, []);

  async function getListUsers() {
    try {
      let response = await api.get(`/users`);
      let { data } = response;
      setListUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(user: any) {
    let { id, name } = user;

    try {
      if (!window.confirm(`Deseja excluir o usuário ${name}? `)) {
        return 0;
      }

      let response = await api.delete(`/users/${id}`);

      let { data, status } = response;

      console.log(data, status);
      // getListUsers()
      // setListUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleGoBack() {
    history.goBack();
  }

  function handleNavigate() {
    history.push('/create-user');
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography variant="h3" className={classes.title}>
          <IconButton edge="end" aria-label="delete" onClick={handleGoBack} className={classes.iconBack}>
            <ArrowBackIcon />
          </IconButton>
          Lista de usuários
        </Typography>
        <div className={classes.demo}>
          <List>
            {listUsers.length > 0 ? (
              listUsers.map((user) => (
                <ListItem key={user.id}>
                  <ListItemAvatar>
                    <img
                      src={`http://localhost:3333/images/upload_images/${user.photo}`}
                      alt=""
                      srcSet=""
                      className={classes.imageUsers}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Single-line item" />
                  <ListItemSecondaryAction>
                    <Link to={`/create-user/${user.id}`}>
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <Typography variant="h5" className={classes.title}>
                Nenhum usuário cadastrado
              </Typography>
            )}
          </List>
        </div>
      </Grid>
      <Fab color="primary" aria-label="add" onClick={handleNavigate}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default UserList;
