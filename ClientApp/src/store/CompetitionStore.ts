import { observable, action, makeObservable } from 'mobx';
import Agent from '../Agent';
import TeamStore from './TeamStore';

export interface Competition {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    challenges: any[];
}

class CompetitionStore {
    @observable inProgress: boolean = false;
    @observable errors: string | undefined = undefined;

    @observable currentCompetition: Competition | undefined;
    @observable loadingCompetition = false;
    @observable updatingCompetition = false;
    @observable updatingCompetitionErrors: string | undefined;
    @observable allCompetitions = [];

    @observable values = {
        id: 0,
        name: '',
        description: '',
        startDate: '',
        endDate: ''
    };

    constructor() {
        makeObservable(this);
    }

    @action reset() {
        this.values = {
            id: 0,
            name: '',
            description: '',
            startDate: '',
            endDate: ''
        };
    }

    @action createCompetition(id: string | number) {
        this.inProgress = true;
        if (id || TeamStore.currentTeam) {
            Agent.requests.post('/competition/create/'+(id || (TeamStore.currentTeam && TeamStore.currentTeam.id)), { name: this.values.name, description: this.values.description, startDate: this.values.startDate, endDate: this.values.endDate  }).then(
                (result) => {
                    if (!result.body) throw "Couldn't create competition";
                    this.inProgress = false;
                    this.errors = undefined;
                    this.currentCompetition = (result.body as Competition);
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
    }

    @action getCompetitions() {
        this.allCompetitions = [];
        Agent.requests.get('/competition/all').then(
            (user) => {
                this.allCompetitions = (user.body as []);
            });
    }

    @action getCompetition(id: string | number) {
        this.allCompetitions = [];
        Agent.requests.get('/competition/id/' + id).then(
            (result) => {
                this.currentCompetition = (result.body as Competition);
            });
    }

    @action deleteCompetition() {
        if (this.currentCompetition) {
            Agent.requests.del('/competition/id/'+this.currentCompetition.id).then(
                (result) => {
                    if (TeamStore.currentTeam)
                        TeamStore.getTeam(TeamStore.currentTeam.id);
                });
        }
    }

    @action forgetCompetition() {
        this.currentCompetition = undefined;
    }

}

export default new CompetitionStore();