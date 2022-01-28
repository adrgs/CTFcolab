import { inject, observer } from "mobx-react";
import * as React from 'react';
import DescriptionList from "../../misc/DescriptionList";

@inject("UserStore")
@observer
export default class Users extends React.Component<any> {
    constructor(props: any) {
        super(props);

        this.props.UserStore.getUsers();
    }

    render() {
        const { allUsers } = this.props.UserStore;

        if (allUsers) {
            return (
                <>
                    <div className="flex relative z-20 items-center">
                        <div className="container mx-auto px-6 p-6 flex flex-col justify-between items-center relative py-8 bg-white dark:bg-gray-800 ">
                            <div className="flex flex-col">
                                {allUsers.map((user: any) => {
                                    return (
                                        <DescriptionList dictObject={user} keysWhitelist={['id', 'name', 'email', 'teams', 'role']} />
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