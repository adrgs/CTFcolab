import { inject, observer } from "mobx-react";
import * as React from 'react';
import DescriptionList from "../../misc/DescriptionList";

@inject("UserStore", "TeamStore")
@observer
export default class Profile extends React.Component<any> {
    render() {
        const { currentUser } = this.props.UserStore;

        if (currentUser) {
            return (
                <>
                    <div className="flex relative z-20 items-center">
                        <div className="container mx-auto px-6 p-6 flex flex-col justify-between items-center relative py-8 bg-white dark:bg-gray-800 ">
                            <div className="flex flex-col">
                                <DescriptionList dictObject={currentUser} keysWhitelist={['id', 'name', 'email', 'teams', 'role']} />
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        return (<></>)
    }
}