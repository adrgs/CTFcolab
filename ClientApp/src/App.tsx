import * as React from 'react';
import { useState, MouseEvent } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
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

@inject("UserStore", "CommonStore")
@observer
export class App extends React.Component<{}, { language: string, changeLanguage: (event: MouseEvent<HTMLAnchorElement>) => void }>  {
    constructor(props:{}) {
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

    render() {
        return (
            <LanguageContext.Provider value={this.state}>
                <Layout key={this.state.language}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/login' component={Login} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/forgotpassword' component={ForgotPassword} />
                        <Route path='/recoverpassword/:userid/:guid' component={RecoverPassword} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </LanguageContext.Provider>
        )
    }
}

export default App;