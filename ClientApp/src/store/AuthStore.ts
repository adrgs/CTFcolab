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
        repeatPassword: '',
        id: 0,
        resetPasswordCode: ''
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
        return !!UserStore.currentUser;
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

    @action setRepeatPassword(password: string) {
        this.values.repeatPassword = password;
    }

    @action reset() {
        this.values.username = '';
        this.values.email = '';
        this.values.password = '';
        this.values.repeatPassword = '';
        this.values.id = 0;
        this.values.resetPasswordCode = '';
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
        this.errors = 'Waiting for server';

        if (this.values.password != this.values.repeatPassword) {
            this.errors = "The passwords don't match";
            this.inProgress = false;
        } else {
            return Agent.Auth.register(this.values.username, this.values.email, this.values.password).then(
                (result) => {
                    this.inProgress = false;
                    this.errors = undefined;
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
    }

    @action forgotpassword() {
        this.inProgress = true;
        this.errors = 'Waiting for server';

        return Agent.Auth.forgotpassword(this.values.username, this.values.email).then(
            (result) => {
                this.inProgress = false;
                this.errors = undefined;
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

    @action recoverpassword() {
        this.inProgress = true;
        this.errors = 'Waiting for server';

        if (this.values.password != this.values.repeatPassword) {
            this.errors = "The passwords don't match";
            this.inProgress = false;
        } else {
            return Agent.Auth.recoverpassword(this.values.id, this.values.password, this.values.resetPasswordCode).then(
                (result) => {
                    this.inProgress = false;
                    this.errors = undefined;
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
    }

    @action logout() {
        CommonStore.setToken(undefined);
        UserStore.forgetUser();
        this.IsAuthenticated = !this.IsAuthenticated;
        return Promise.resolve();
    }
}

type Error = {
    response?: { body?: { errors?: any } };
    message?: string | undefined;
}

export default new AuthStore();