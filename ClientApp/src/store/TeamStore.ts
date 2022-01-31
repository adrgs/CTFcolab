import { observable, action, makeObservable } from 'mobx';
import Agent from '../Agent';
import CommonStore from './CommonStore';
import { User } from './UserStore';

export interface Team {
    id: number;
    name: string;
    description: string;
    inviteCode: string;
    competitions: any[];
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
                console.log(this.currentTeam);
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
                console.log(this.currentTeam);
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

    @action forgetTeam() {
        this.currentTeam = undefined;
    }

}

export default new TeamStore();