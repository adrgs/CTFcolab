import { observable, action } from 'mobx';
import Agent from '../Agent';

export interface User {
    id: number;
    username: string;
    email: string;
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
  
    @action pullUser() {
      this.loadingUser = true;
      return Agent.Auth.current()
        .then(action((user: string | {token?:string}) => { this.currentUser = typeof user == "string" ? decodeToken(user) : user; }))
        .finally(action(() => { this.loadingUser = false; }))
    }
  
    @action updateUser(newUser: User) {
      this.updatingUser = true;
      return Agent.Auth.save(newUser)
        .then(action((user: string | {token?:string}) => { this.currentUser = typeof user == "string" ? decodeToken(user) : user; }))
        .finally(action(() => { this.updatingUser = false; }))
    }
  
    @action forgetUser() {
      this.currentUser = undefined;
    }
  
  }
  
  export default new UserStore();