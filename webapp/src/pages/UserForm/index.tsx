import React, { useEffect, useState, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import AvatarEditor from 'react-avatar-editor';

import { TextField, Typography, makeStyles, IconButton, Button } from '@material-ui/core/';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { RouteComponentProps } from 'react-router-dom';

import api from '../../services/api';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface RouteParams {
  id: string;
}

interface UserFormProps extends RouteComponentProps<RouteParams> {}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  form: {
    margin: '16px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#fff',
    fontSize: 12,
    height: theme.spacing(6),
    backgroundColor: '#8257e6',
    '&:hover': {
      backgroundColor: '#7f67b8',
      opacity: 0.8,
      transition: 0.2,
    },
  },
  cropImage: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const UserForm: React.FC<UserFormProps> = () => {
  const history = useHistory();
  const params = useParams<RouteParams>();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState<string>('');
  const [photo, setPhoto] = useState('');
  const [dtNasc, setDtNasc] = useState<Date | null>(new Date());

  useEffect(() => {
    if (params.id) getUserData();
  }, [params.id]);

  function getFormatedDate(dt: Date) {
    let data = new Date(dt),
      dia = data.getDate().toString(),
      diaF = dia.length === 1 ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length === 1 ? '0' + mes : mes,
      anoF = data.getFullYear(),
      hour = ('0' + data.getHours()).slice(-2).toString(),
      minutes = ('0' + data.getMinutes()).slice(-2).toString(),
      seconds = ('0' + data.getSeconds()).slice(-2).toString();

    return anoF + '-' + mesF + '-' + diaF + 'T' + hour + ':' + minutes + ':' + seconds + '0Z'; // 2020-02-05T12:54:000Z
  }

  async function getUserData() {
    try {
      let response = await api(`/users/${params.id}`);

      let { data } = response;

      // console.log(data);

      let birthday = new Date(data.birth);

      setName(data.name);
      setPhoto(data.photo);

      setDtNasc(birthday);
    } catch (error) {
      console.error(error);
    }
  }

  function getFormData() {
    let form_data = new FormData();

    if (typeof photo === 'object' && photo !== null) {
      form_data.append('photo', photo);
    }
    form_data.append('name', name);

    // @ts-ignore
    form_data.append('birth', getFormatedDate(dtNasc));

    return form_data;
  }

  async function updateUser() {
    try {
      let response = await api.post(`/users/${params.id}`, getFormData());

      let { status } = response;

      if (status === 200) {
        enqueueSnackbar(`Novo usuário cadastrado com sucesso!`, {
          variant: 'success',
        });
        setTimeout(() => {
          history.push(`/users`);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Erro ao atualizar dados do usuário`, {
        variant: 'error',
      });
    }
  }

  async function createUser() {
    try {
      let response = await api.post(`/users/`, getFormData());

      let { status } = response;

      // console.log( status);

      if (status === 200) {
        enqueueSnackbar(`Novo usuário cadastrado com sucesso`, {
          variant: 'success',
        });
        setTimeout(() => {
          history.push(`/users`);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Erro ao criar novo usuário`, {
        variant: 'error',
      });
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();

    // PUT
    if (params.id) updateUser();

    // POST
    createUser();
  }

  function handleGoBack() {
    history.goBack();
  }

  function handleChangeImage(event: any) {
    //@ts-ignore
    setPhoto(event.target.files[0]);
  }

  function handleChangeBirthDate(date: Date | null) {
    setDtNasc(date);
  }

  return (
    <div>
      <Typography variant="h3"> {params.id ? 'Editar usuário' : 'Criar novo usuário'}</Typography>

      <div className={classes.cropImage}>
        <AvatarEditor
          image={photo}
          width={120}
          height={120}
          style={{ border: '1px solid #f2f2f2f2' }}
          scale={1.2}
          rotate={0}
        />
      </div>
      <form onSubmit={handleSave} className={classes.form}>
        <input type="file" name="file" id="file" onChange={handleChangeImage} />

        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nome"
          name="name"
          autoComplete="name"
          autoFocus
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            fullWidth
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Data de nascimento"
            value={dtNasc}
            onChange={(e) => handleChangeBirthDate(e)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>

        <Button type="submit" color="primary" className={classes.submit} fullWidth>
          Enviar
        </Button>
      </form>

      <IconButton edge="end" aria-label="delete" onClick={handleGoBack}>
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
};

export default UserForm;
