import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IPrivateRoute {
    component: React.ComponentClass<any>;
}

export const PrivateRoute = ({
    component: Component, ...rest }: IPrivateRoute
) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)