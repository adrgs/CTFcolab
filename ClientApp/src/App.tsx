import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Counter from './components/pages/Counter';
import FetchData from './components/pages/FetchData';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import ForgotPassword from './components/pages/ForgotPassword';
import RecoverPassword from './components/pages/RecoverPassword';

import './index.generated.css'
import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/forgotpassword' component={ForgotPassword} />
        <Route path='/recoverpassword/:userid/:guid' component={RecoverPassword} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
