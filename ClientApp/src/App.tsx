import * as React from 'react';
import { useState, MouseEvent } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Logout from './components/pages/Logout';
import ForgotPassword from './components/pages/ForgotPassword';
import RecoverPassword from './components/pages/RecoverPassword';
import NotFound from './components/pages/NotFound';
import { inject, observer } from "mobx-react";

import './index.generated.css'
import './custom.css'
import i18n from './services/i18n';

export const LanguageContext = React.createContext({
    language: i18n.language,
    changeLanguage: function(event: MouseEvent<HTMLAnchorElement>){}
});

@inject("AuthStore")
@observer
export class App extends React.Component<any, { language: string, changeLanguage: (event: MouseEvent<HTMLAnchorElement>) => void }>  {
    constructor(props: any) {
        super(props);

        const changeLanguage = (event: MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            const language: string | null = (event.currentTarget as HTMLAnchorElement).getAttribute("hreflang");
            if (language) {
                localStorage.language = language;
                i18n.language = language;
                i18n.changeLanguage(language);
                this.setState(state => ({
                    language: language,
                }));
            }
          };

        this.state = {
            language: i18n.language,
            changeLanguage: changeLanguage,
        };
    }

    AuthenticatedRoute(path: string, component: any, to: string) {
        if (this.props.AuthStore.IsAuthenticated) {
            return (
                <Route path={path} component={component} />
            );
        }
        return (
            <Route path={path} render={props => (
                <Redirect to={{ pathname: to, state: { from: props.location } }} />
            )} />
        );
    }

    AuthorizedRoute(role:string, path: string, component: any, to: string) {
        if (this.props.AuthStore.IsAuthenticated && this.props.AuthStore.isAuthorized(role)) {
            return (
                <Route path={path} component={component} />
            );
        }
        return (
            <Route path={path} render={props => (
                <Redirect to={{ pathname: to, state: { from: props.location } }} />
            )} />
        );
    }

    UnauthenticatedRoute(path: string, component: any, to: string) {
        if (this.props.AuthStore.IsAuthenticated) {
            return (
                <Route path={path} render={props => (
                    <Redirect to={{ pathname: to, state: { from: props.location } }} />
                )} />
            );
        }
        return (
            <Route path={path} component={component} />
        );
    }

    render() {
        return (
            <LanguageContext.Provider value={this.state}>
                <Layout key={this.state.language}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        {this.UnauthenticatedRoute('/login', Login, '/')}
                        {this.UnauthenticatedRoute('/signup', Signup, '/')}
                        {this.UnauthenticatedRoute('/forgotpassword', ForgotPassword, '/')}
                        {this.UnauthenticatedRoute('/recoverpassword/:userid/:guid', RecoverPassword, '/')}
                        {this.AuthenticatedRoute('/logout', Logout, '/')}
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </LanguageContext.Provider>
        )
    }
}

export default App;