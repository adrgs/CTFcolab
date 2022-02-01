import { inject, observer } from "mobx-react";
import * as React from 'react';
import DescriptionList from "../../misc/DescriptionList";
import _uniqueId from 'lodash/uniqueId';
import Button from "../../misc/Button";

@inject("CompetitionStore", "UserStore")
@observer
export default class Competition extends React.Component<any> {
    componentWillMount() {

        this.props.CompetitionStore.getCompetition(this.props.match.params.competitionid);

        this.createChallenge = this.createChallenge.bind(this);
        this.deleteCompetition = this.deleteCompetition.bind(this);
        this.goToChallenge = this.goToChallenge.bind(this);
    }

    componentDidUpdate() {
        const { currentCompetition } = this.props.CompetitionStore;
        if (currentCompetition && currentCompetition.id.toString() != this.props.match.params.competitionid) {
            this.props.CompetitionStore.getCompetition(this.props.match.params.competitionid);
        }
    }

    createChallenge() {
        this.props.history.replace("/challenge/create/" + this.props.match.params.competitionid);
    }

    deleteCompetition() {
        this.props.CompetitionStore.deleteCompetition();
        this.props.history.replace("/");
    }

    goToChallenge(e: React.MouseEvent<HTMLButtonElement>): void {
        this.props.history.replace("/challenge/" + (e.target as HTMLButtonElement).value);
    }

    render() {
        const { currentCompetition } = this.props.CompetitionStore;
        const { currentUser } = this.props.UserStore;

        if (currentCompetition) {
            return (
                <>
                    <div className="flex relative z-20 items-center">
                        <div className="container mx-auto px-6 p-6 flex flex-col justify-between items-center relative py-8 bg-white dark:bg-gray-800 ">
                            <div className="flex flex-col">
                                <DescriptionList dictObject={currentCompetition} keysBlacklist={['challenges', 'team', 'id']} />
                            </div>
                            {
                                currentUser && currentUser.role == "Admin" && 
                                <div className="flex flex-col my-4">
                                    <Button onClick={this.deleteCompetition} label="Delete Competition" color="red" />
                                </div>
                            }
                            <h1>Challenges</h1>
                            { (currentCompetition && currentCompetition.challenges && currentCompetition.challenges.length > 0 &&
                                currentCompetition.challenges.map((challenge: any) => {
                                    return (<div key={_uniqueId('challenge')} className="flex flex-col">
                                        <Button onClick={this.goToChallenge} label="View challenge" color={challenge.solved ? "green" : "blue"} value={challenge.id} />
                                        <DescriptionList dictObject={challenge} keysBlacklist={['id', 'challenges', 'competition', 'comments', 'flag', 'solved']} />
                                    </div>)
                                })
                                ) || (<h1><br></br>No challenges found.</h1>)
                            }
                            {
                                currentUser && currentUser.role == "Admin" && 
                                <div className="flex flex-col my-4 mb-16">
                                    <Button onClick={this.createChallenge} label="Create challenge" color="green" />
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