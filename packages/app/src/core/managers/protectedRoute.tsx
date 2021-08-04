import {FC, Fragment} from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';
import { hasAdminPrivileges } from '../models/UserData';
import { AuthentificationServiceSingleton } from '../services/authentificationService';

interface PrivateRouteProps extends RouteProps {
    redirectTo: string;
    children?: any;
    component?: any;
}

export const ConnectedProtectedRoute : FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const { children , redirectTo, ...rest } = props;

    let connected: boolean = AuthentificationServiceSingleton.isConnected

    return (
        <>
            {
                connected
                ? children
                : <Redirect to={redirectTo} />
            }
        </>
    );
};

export const NotConnectedProtectedRoute : FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const { component : Component,children, redirectTo, ...rest } = props;

    let connected: boolean = !AuthentificationServiceSingleton.isConnected

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                connected ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: redirectTo,
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

export const AdminProtectedRoute : FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const { component : Component, redirectTo, ...rest } = props;

    let connected: boolean = AuthentificationServiceSingleton.isAdmin;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                connected ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: redirectTo,
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};