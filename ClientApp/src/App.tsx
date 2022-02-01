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
import Users from './components/pages/User/Users';
import Profile from './components/pages/User/Profile';
import AllTeams from './components/pages/Team/AllTeams';
import CreateTeam from './components/pages/Team/CreateTeam';
import JoinTeam from './components/pages/Team/JoinTeam';
import Team from './components/pages/Team/Team';
import CreateCompetition from './components/pages/Competition/CreateCompetition';
import Competition from './components/pages/Competition/Competition';
import Challenge from './components/pages/Challenge/Challenge';
import CreateChallenge from './components/pages/Challenge/CreateChallenge';
import CreateComment from './components/pages/Comment/CreateComment';

export const LanguageContext = React.createContext({
    language: i18n.language,
    changeLanguage: function(event: MouseEvent<HTMLAnchorElement>){}
});

@inject("AuthStore", "UserStore")
@observer
export class App extends React.Component<any, { language: string, changeLanguage: (event: MouseEvent<HTMLAnchorElement>) => void }>  {
    constructor(props: any) {
        super(props);

        this.props.UserStore.pullUser();

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
        if (this.props.UserStore.currentUser && this.props.AuthStore.IsAuthenticated && this.props.AuthStore.isAuthorized(role)) {
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
                        
                        {this.AuthorizedRoute('Admin', '/users', Users, '/login')}
                        {this.AuthorizedRoute('Admin', '/team/all', AllTeams, '/login')}
                        {this.AuthorizedRoute('Admin', '/team/create', CreateTeam, '/login')}
                        {this.AuthorizedRoute('Admin', '/competition/create/:teamid', CreateCompetition, '/login')}
                        {this.AuthorizedRoute('Admin', '/challenge/create/:competitionid', CreateChallenge, '/login')}
                        {this.AuthorizedRoute('Admin', '/comment/create/:challengeid', CreateComment, '/login')}
                        {this.AuthenticatedRoute('/profile', Profile, '/login')}
                        {this.AuthenticatedRoute('/team/join', JoinTeam, '/login')}
                        {this.AuthenticatedRoute('/team/:teamid', Team, '/login')}
                        {this.AuthenticatedRoute('/competition/:competitionid', Competition, '/login')}
                        {this.AuthenticatedRoute('/challenge/:challengeid', Challenge, '/login')}
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </LanguageContext.Provider>
        )
    }
}

export default App;