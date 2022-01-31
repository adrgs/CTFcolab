import { inject, observer } from "mobx-react";
import * as React from 'react';
import DescriptionList from "../../misc/DescriptionList";

@inject("TeamStore")
@observer
export default class Team extends React.Component<any> {
    componentWillMount() {

        this.props.TeamStore.getTeam(this.props.match.params.teamid);

    }

    componentDidUpdate() {
        const { currentTeam } = this.props.TeamStore;
        if (currentTeam.id.toString() != this.props.match.params.teamid) {
            this.props.TeamStore.getTeam(this.props.match.params.teamid);
        }
    }

    render() {
        const { currentTeam } = this.props.TeamStore;

        if (currentTeam) {
            return (
                <>
                    <div className="flex relative z-20 items-center">
                        <div className="container mx-auto px-6 p-6 flex flex-col justify-between items-center relative py-8 bg-white dark:bg-gray-800 ">
                            <div className="flex flex-col">
                                <DescriptionList dictObject={currentTeam} keysWhitelist={['id', 'name', 'inviteCode', 'owner', 'users', 'description']} />
                            </div>
                            <h1>Competitions (WIP)</h1>
                        </div>
                    </div>
                </>
            )
        }
        return (<></>);
    }
}