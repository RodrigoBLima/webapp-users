import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import UserForm from '../pages/UserForm';
import UserList from '../pages/UserList';
import Landing from '../pages/Landing';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing}></Route>
      <Route path="/create-user/" exact component={UserForm}></Route>
      <Route path="/create-user/:id" component={UserForm}></Route>
      <Route path="/users" component={UserList}></Route>
    </BrowserRouter>
  );
}
