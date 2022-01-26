import { observable, action, makeObservable, reaction } from 'mobx';
import Agent from '../Agent';
import UserStore, { User } from './UserStore';
import CommonStore from './CommonStore';

class AuthStore {
    @observable inProgress: boolean = false;
    @observable errors: string | undefined = undefined;

    @observable IsAuthenticated: boolean = CommonStore.token != undefined;

    @observable values = {
        username: '',
        email: '',
        password: '',
    };

    constructor() {
        makeObservable(this);

        reaction(
            () => this.isAuthenticated(),
            IsAuthenticated => {

            }
          );
    }

    @action isAuthenticated() {
        return CommonStore.token != undefined;
    }

    @action isAuthorized(role: string) {
        return this.isAuthenticated() && UserStore.currentUser && UserStore.currentUser.role == role;
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
        Agent.Auth.login(this.values.username, this.values.password).then(
            (result) => {
                try {
                    CommonStore.setToken(JSON.parse(result.text));
                    UserStore.pullUser();
                    this.IsAuthenticated = !this.IsAuthenticated;
                }
                catch {
                    this.errors = "Server error";
                }

                this.inProgress = false;
            }
        ).catch((err) => {
            if (err.status == 404) {
                this.errors = "404 API not found";
            }
            if (err.status == 401) {
                this.reset();
            }
            function objToString(obj: any) {
                var str = '';
                for (var p in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, p)) {
                        str += obj[p] + '\n';
                    }
                }
                return str;
            }

            if (err.message) {
                var obj = JSON.parse(err.message);
                if (typeof obj == "string") {
                    this.errors = obj;
                } else {
                    if (obj && obj.errors) {
                        this.errors = objToString(obj.errors);
                    } else {
                        this.errors = objToString(obj);
                    }
                }
            }
            this.inProgress = false;
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
        console.log("Logout!");
        CommonStore.setToken(undefined);
        UserStore.forgetUser();
        this.IsAuthenticated = !this.IsAuthenticated;
        return Promise.resolve();
    }
}

type Error = {
    response?: { body?: { errors?:any } };
    message?: string | undefined;
  }

export default new AuthStore();