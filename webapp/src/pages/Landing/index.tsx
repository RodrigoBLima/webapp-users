import React from 'react';

import { Link } from 'react-router-dom';

// MATERIAL UI
import { Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#fff',
    fontSize: 12,
    height: theme.spacing(11),
    marginRight: 15,
    '&:hover': {
      opacity: 0.8,
      transition: 0.2,
    },
  },
}));

const Landing: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Button color="primary" className={classes.submit} variant="contained">
        <Link to="/create-user">Criar Usuários</Link>
      </Button>
      <Button color="primary" className={classes.submit} variant="contained">
        <Link to="/users">Lista Usuários</Link>
      </Button>
    </>
  );
};

export default Landing;
