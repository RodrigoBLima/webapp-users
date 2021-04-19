import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import Routes from './Routes';
import theme from './theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Routes />
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

export default App;
