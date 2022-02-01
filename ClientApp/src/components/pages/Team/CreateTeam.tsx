import { inject, observer } from "mobx-react";
import * as React from 'react';
import Button from "../../misc/Button";
import DescriptionList from "../../misc/DescriptionList";
import InputText from "../../misc/InputText";

@inject("UserStore", "TeamStore")
@observer
export default class CreateTeam extends React.Component<any> {

    componentWillMount() {

        this.props.TeamStore.forgetTeam();

    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.TeamStore.values.name = e.target.value;
    };

    handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.TeamStore.values.description = e.target.value;
    };

    handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.TeamStore.createTeam();
    };


    render() {
        const { currentUser } = this.props.UserStore;
        const { values, errors, inProgress } = this.props.TeamStore;

        if (!inProgress && this.props.TeamStore.currentTeam) {
            this.props.history.replace("/team/" + this.props.TeamStore.currentTeam.id);
        }

        if (currentUser) {
            return (
                <div className="flex flex-col items-center">
                    <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-900 sm:px-6 md:px-8 lg:px-10">
                        <div className="p-6 mt-8">
                            <form action="#" onSubmit={this.handleSubmitForm}>
                                <div className="flex flex-col mb-2 my-2">
                                    <InputText name="team-invite-code" value={values.name} onChange={this.handleNameChange} type="text" placeholder="Team name" id="team-invite-code" />
                                </div>
                                <div className="flex flex-col mb-2 my-2">
                                    <InputText name="team-description" value={values.description} onChange={this.handleDescriptionChange} type="text" placeholder="Team description" id="team-description" />
                                </div>
                                <h2 className={'text-[#ED4A50] pb-4 ' + (errors ? 'visible' : 'invisible')}>
                                    Error: {errors}
                                </h2>
                                <div className="flex w-full my-4">
                                    <Button submit={true} label="Create Team" color="blue" disabled={inProgress} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        return (<></>)
    }
}