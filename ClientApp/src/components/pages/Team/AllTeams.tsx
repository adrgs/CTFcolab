import { inject, observer } from "mobx-react";
import * as React from 'react';
import DescriptionList from "../../misc/DescriptionList";

@inject("TeamStore")
@observer
export default class AllTeams extends React.Component<any> {
    constructor(props: any) {
        super(props);

        this.props.TeamStore.getTeams();
    }

    render() {
        const { allTeams } = this.props.TeamStore;

        if (allTeams) {
            return (
                <>
                    <div className="flex relative z-20 items-center">
                        <div className="container mx-auto px-6 p-6 flex flex-col justify-between items-center relative py-8 bg-white dark:bg-gray-800 ">
                            <div className="flex flex-col">
                                {allTeams.map((user: any) => {
                                    return (
                                        <DescriptionList dictObject={user} keysWhitelist={['id', 'name', 'inviteCode', 'owner', 'users']} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        return (<></>);
    }
}