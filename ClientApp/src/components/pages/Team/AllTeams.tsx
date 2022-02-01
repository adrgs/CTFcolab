import { inject, observer } from "mobx-react";
import * as React from 'react';
import { Obj } from "../../../store/AuthStore";
import DescriptionList from "../../misc/DescriptionList";

interface Props {
    TeamStore: Obj
    [key: string]: any
}

@inject("TeamStore")
@observer
export default class AllTeams extends React.Component<any> {
    constructor(props: Props) {
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
                                {allTeams.map((user: Obj) => {
                                    return (
                                        <DescriptionList dictObject={user} keysWhitelist={['id', 'name', 'inviteCode', 'owner', 'users', 'description']} />
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