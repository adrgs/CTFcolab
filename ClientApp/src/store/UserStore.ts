import { observable, action, makeObservable } from 'mobx';
import Agent from '../Agent';
import CommonStore from './CommonStore';
import { Team } from './TeamStore';

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    teams: Team[];
    token?: string;
}

function urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            return undefined;
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
}

function decodeToken(token: string = '') {
    if (token === null || token === '') { return { 'upn': '' }; }
    const parts = token.split('.');
    if (parts.length !== 3) {
        return undefined;
    }
    const decoded = urlBase64Decode(parts[1]);
    if (!decoded) {
        return undefined;
    }
    return JSON.parse(decoded);
}

class UserStore {

    @observable currentUser: User | undefined;
    @observable loadingUser = false;
    @observable updatingUser = false;
    @observable updatingUserErrors: string | undefined;
    @observable allUsers = [];

    constructor() {
        makeObservable(this);
    }

    @action pullUser() {
        this.loadingUser = true;
        Agent.Auth.current().then(
            (user) => {
                this.currentUser = (user.body as User);
            }).catch(() => {
                CommonStore.setToken(undefined);
            }).finally(() => this.loadingUser = false);
    }

    @action updateUser(newUser: User) {
        this.updatingUser = true;
        return Agent.Auth.save(newUser)
            .then(action((user: any) => { this.currentUser = typeof user == "string" ? decodeToken(user) : user; }))
            .finally(action(() => { this.updatingUser = false; }))
    }

    @action getUsers() {
        this.allUsers = [];
        Agent.requests.get('/user/all').then(
            (user) => {
                this.allUsers = (user.body as []);
            });
    }

    @action forgetUser() {
        this.currentUser = undefined;
    }

}

export default new UserStore();