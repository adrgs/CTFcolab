import { inject, observer } from "mobx-react";
import * as React from 'react';
import Button from "../../misc/Button";
import DescriptionList from "../../misc/DescriptionList";
import _uniqueId from 'lodash/uniqueId';
import { Obj } from "../../../store/AuthStore";

@inject("TeamStore", "UserStore")
@observer
export default class Team extends React.Component<any> {
    componentWillMount() {

        this.props.TeamStore.getTeam(this.props.match.params.teamid);

        this.deleteTeam = this.deleteTeam.bind(this);
        this.createCompetition = this.createCompetition.bind(this);
        this.goToCompetition = this.goToCompetition.bind(this);

    }

    componentDidUpdate() {
        const { currentTeam } = this.props.TeamStore;
        if (currentTeam && currentTeam.id.toString() != this.props.match.params.teamid) {
            this.props.TeamStore.getTeam(this.props.match.params.teamid);
        }
    }

    deleteTeam() {
        this.props.TeamStore.deleteTeam();
        this.props.history.replace("/");
    }

    createCompetition() {
        this.props.history.replace("/competition/create/" + this.props.match.params.teamid);
    }

    goToCompetition(e: React.MouseEvent<HTMLButtonElement>): void {
        this.props.history.replace("/competition/" + (e.target as HTMLButtonElement).value);
    }

    render() {
        const { currentTeam } = this.props.TeamStore;
        const { currentUser } = this.props.UserStore;

        if (currentTeam) {
            return (
                <>
                    <div className="flex relative z-20 items-center">
                        <div className="container mx-auto px-6 p-6 flex flex-col justify-between items-center relative py-8 bg-white dark:bg-gray-800 ">
                            <div className="flex flex-col">
                                <DescriptionList dictObject={currentTeam} keysWhitelist={['name', 'inviteCode', 'owner', 'users', 'description']} />
                            </div>
                            {
                                currentUser && currentTeam && currentUser.id == currentTeam.owner.id && 
                                <div className="flex flex-col my-4">
                                    <Button onClick={this.deleteTeam} label="Delete Team" color="red" />
                                </div>
                            }
                            <h1>Competitions</h1>
                            { (currentTeam && currentTeam.competitions && currentTeam.competitions.length > 0 &&
                                currentTeam.competitions.map((competition: Obj) => {
                                    return (<div key={_uniqueId('competition')} className="flex flex-col">
                                        <Button onClick={this.goToCompetition} label="View competition" color="blue" value={competition.id} />
                                        <DescriptionList dictObject={competition} keysBlacklist={['id', 'challenges']} />
                                    </div>)
                                })
                                ) || (<h1><br></br>No competitions found.</h1>)
                            }
                            {
                                currentUser && currentTeam && currentUser.id == currentTeam.owner.id && 
                                <div className="flex flex-col my-4 mb-16">
                                    <Button onClick={this.createCompetition} label="Create competition" color="green" />
                                </div>
                            }
                        </div>
                    </div>
                </>
            )
        }
        return (<></>);
    }
}