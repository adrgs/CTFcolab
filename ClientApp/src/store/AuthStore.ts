import { observable, action, makeObservable } from 'mobx';
import Agent from '../Agent';
import UserStore, { User } from './UserStore';
import CommonStore from './CommonStore';

class AuthStore {
    @observable inProgress: boolean = false;
    @observable errors: string[] | undefined = undefined;

    @observable values = {
        username: '',
        email: '',
        password: '',
    };

    constructor() {
        makeObservable(this);
    }

    @action setUsername(username: string) {
        this.values.username = username;
    }

    @action setEmail(email: string) {
        this.values.email = email;
    }

    @action setPassword(password: string) {
        this.values.password = password;
    }

    @action reset() {
        this.values.username = '';
        this.values.email = '';
        this.values.password = '';
    }

    @action login() {
        this.inProgress = true;
        this.errors = undefined;
        Agent.Auth.login(this.values.email, this.values.password).then(
            (result) => {
                console.log(result);
                if (typeof result == "string") {
                    CommonStore.setToken(result);
                    //UserStore.pullUser();
                }
                else if (typeof result == "object") {
                    CommonStore.setToken((result as any).token);
                    //UserStore.pullUser();
                } else {
                    let err = result as Error;
                    this.errors = err.response && err.response.body && err.response.body.errors;
                }
                this.inProgress = false;
            }
        ).catch((err) => {
            if (err.status == 404) {
                this.errors = ["404 API not found"];
            }
        });
    }

    @action register() {
        this.inProgress = true;
        this.errors = undefined;
        return Agent.Auth.register(this.values.username, this.values.email, this.values.password)
            .then((user: any) => CommonStore.setToken(user && user.token))
            .then(() => UserStore.pullUser())
            .catch(action((err:Error) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action logout() {
        CommonStore.setToken(undefined);
        UserStore.forgetUser();
        return Promise.resolve();
    }
}

type Error = {
    response?: { body?: { errors?:any } };
    message?: string | undefined;
  }

export default new AuthStore();