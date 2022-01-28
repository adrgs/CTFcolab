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

    @observable currentTeam: Team | undefined;
    @observable loadingTeam = false;
    @observable updatingTeam = false;
    @observable updatingTeamErrors: string | undefined;
    @observable allTeams = [];

    @observable values = {
        id:0,
        name:'',
        description:'',
        inviteCode:''
    };

    constructor() {
        makeObservable(this);
    }

    @action createTeam(name: string, description: string) {

    }

    @action joinTeam(inviteCode: string) {

    }

    @action forgetTeam() {
        this.currentTeam = undefined;
    }

}

export default new TeamStore();