import { observable, action, makeObservable } from 'mobx';
import Agent from '../Agent';
import { Obj } from './AuthStore';
import CompetitionStore from './CompetitionStore';

export interface Challenge {
    id: number;
    name: string;
    description: string;
    flag: string;
    category: string;
    solved: boolean;
    comments: Comment[];
}

interface Comment {
    text: string;
}

class ChallengeStore {
    @observable inProgress: boolean = false;
    @observable errors: string | undefined = undefined;

    @observable currentChallenge: Challenge | undefined;
    @observable loadingChallenge = false;
    @observable updatingChallenge = false;
    @observable updatingChallengeErrors: string | undefined;
    @observable allChallenges = [];

    @observable values = {
        id: 0,
        name: '',
        description: '',
        flag: '',
        category: '',
        solved: false,
        text: ''
    };

    constructor() {
        makeObservable(this);
    }

    @action reset() {
        this.values = {
            id: 0,
            name: '',
            description: '',
            flag: '',
            category: '',
            solved: false,
            text: ''
        };
    }

    @action createChallenge(id: string | number) {
        if (id || CompetitionStore.currentCompetition) {
            Agent.requests.post('/challenge/create/' + (id || (CompetitionStore.currentCompetition && CompetitionStore.currentCompetition.id)), { name: this.values.name, description: this.values.description, category: this.values.category }).then(
                (result) => {
                    if (!result.body) throw "Couldn't create challenge";
                    this.inProgress = false;
                    this.errors = undefined;
                    this.currentChallenge = (result.body as Challenge);
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
    }

    @action updateChallenge() {
        if (this.currentChallenge) {
            Agent.requests.put('/challenge/id/' + this.currentChallenge.id, { solved: this.values.solved, flag: this.values.flag }).then(
                (result) => {
                    this.currentChallenge = (result.body as Challenge);
                });
        }
    }

    @action createComment() {
        if (this.currentChallenge) {
            Agent.requests.post('/challenge/comment/' + this.currentChallenge.id, { text: this.values.text }).then(
                (result) => {
                    
                });
        }
    }


    @action getChallenges() {
        this.allChallenges = [];
        Agent.requests.get('/challenge/all').then(
            (user) => {
                this.allChallenges = (user.body as []);
            });
    }

    @action getChallenge(id: string | number) {
        this.allChallenges = [];
        Agent.requests.get('/challenge/id/' + id).then(
            (result) => {
                this.currentChallenge = (result.body as Challenge);
                this.values.flag = this.currentChallenge.flag;
                this.values.solved = this.currentChallenge.solved;
            });
    }

    @action deleteChallenge() {
        if (this.currentChallenge) {
            Agent.requests.del('/challenge/id/' + this.currentChallenge.id).then(
                (result) => {
                    if (CompetitionStore.currentCompetition)
                        CompetitionStore.getCompetition(CompetitionStore.currentCompetition.id);
                });
        }
    }

    @action forgetChallenge() {
        this.currentChallenge = undefined;
    }

}

export default new ChallengeStore();