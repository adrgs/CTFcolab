import { observable, action, makeObservable } from 'mobx';
import Agent from '../Agent';
import CommonStore from './CommonStore';
import { User } from './UserStore';
import UserStore from './UserStore';
import Competition from '../components/pages/Competition/Competition';
import { Obj } from './AuthStore';

export interface Team {
    id: number;
    name: string;
    description: string;
    inviteCode: string;
    competitions: Competition[];
    owner: User;
    users: User[];
}

class TeamStore {
    @observable inProgress: boolean = false;
    @observable errors: string | undefined = undefined;

    @observable currentTeam: Team | undefined;
    @observable loadingTeam = false;
    @observable updatingTeam = false;
    @observable updatingTeamErrors: string | undefined;
    @observable allTeams = [];

    @observable values = {
        id: 0,
        name: '',
        description: '',
        inviteCode: ''
    };

    constructor() {
        makeObservable(this);
    }

    @action reset() {
        this.values = {
            id: 0,
            name: '',
            description: '',
            inviteCode: ''
        };
    }

    @action createTeam() {
        Agent.requests.post('/team/create', { name: this.values.name, description: this.values.description }).then(
            (result) => {
                if (!result.body) throw "Couldn't create team";
                this.inProgress = false;
                this.errors = undefined;
                this.currentTeam = (result.body as Team);
                UserStore.pullUser();
            }
        ).catch((err) => {
            if (err.status == 404) {
                this.errors = "404 API not found";
            }
            if (err.status == 401) {
                this.reset();
            }
            function objToString(obj: Obj) {
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
            if (typeof err == "string") {
                this.errors = err;
            }
            this.inProgress = false;
        });
    }

    @action joinTeam() {
        Agent.requests.post('/team/join', { inviteCode: this.values.inviteCode }).then(
            (result) => {
                if (!result.body) throw "Invalid code";
                this.inProgress = false;
                this.errors = undefined;
                this.currentTeam = (result.body as Team);
            }
        ).catch((err) => {
            if (err.status == 404) {
                this.errors = "404 API not found";
            }
            if (err.status == 401) {
                this.reset();
            }
            function objToString(obj: Obj) {
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
            if (typeof err == "string") {
                this.errors = err;
            }
            this.inProgress = false;
        });
    }

    @action getTeams() {
        this.allTeams = [];
        Agent.requests.get('/team/all').then(
            (user) => {
                this.allTeams = (user.body as []);
            });
    }

    @action getTeam(id: string | number) {
        this.allTeams = [];
        Agent.requests.get('/team/id/'+id).then(
            (result) => {
                this.currentTeam = (result.body as Team);
            });
    }

    @action deleteTeam() {
        if (this.currentTeam) {
            Agent.requests.del('/team/id/'+this.currentTeam.id).then(
                (result) => {
                    UserStore.pullUser();
                });
        }
    }

    @action forgetTeam() {
        this.currentTeam = undefined;
    }

}

export default new TeamStore();