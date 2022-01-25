import { AuthHeader } from "./helpers/auth-header";
import { UserConstants } from "./constants/user.constants";

export const UserService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

interface User {
    id: number;
    username: string;
    email: string;
    deleting: any;
}

function parseJwt(token: string) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64) || 'null');
}

function login(username: string, password: string): Promise<User> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/api/user/login`, requestOptions)
        .then(handleResponse)
        .then(token => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            var user = parseJwt(token);
            user.token = token;

            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader()
    };

    return fetch(`api/user`, requestOptions).then(handleResponse);
}

function getById(id: number) {
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader()
    };

    return fetch(`api/user/${id}`, requestOptions).then(handleResponse);
}

function register(user: User) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/api/user`, requestOptions).then(handleResponse);
}

function update(user: User) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...AuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/api/user/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: number) {
    const requestOptions = {
        method: 'DELETE',
        headers: AuthHeader()
    };

    return fetch(`/api/user/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response: Response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text || 'null');
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

interface Action {
    type: string;
    user?: User;
    users?: User[];
    error?: string;
    id?: number;
}

let user = JSON.parse(localStorage.getItem('user') || 'null');
const initialState = user ? { loggedIn: true, user } : {};

export function Authentication(state = initialState, action: Action) {
    switch (action.type) {
        case UserConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case UserConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case UserConstants.LOGIN_FAILURE:
            return {};
        case UserConstants.LOGOUT:
            return {};
        default:
            return state
    }
}

export function Registration(state = {}, action: Action) {
    switch (action.type) {
        case UserConstants.REGISTER_REQUEST:
            return { registering: true };
        case UserConstants.REGISTER_SUCCESS:
            return {};
        case UserConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}

interface State {
    items: User[];
}

export function Users(state: State = { items: [] }, action: Action) {
    switch (action.type) {
        case UserConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case UserConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case UserConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case UserConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case UserConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case UserConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}