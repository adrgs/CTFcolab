import { inject, observer } from "mobx-react";
import * as React from 'react';
import Button from "../../misc/Button";
import { DatePicker } from "../../misc/DatePicker";
import { DateTimePicker } from "../../misc/DateTimePicker";
import DescriptionList from "../../misc/DescriptionList";
import InputText from "../../misc/InputText";

@inject("UserStore", "ChallengeStore")
@observer
export default class CreateChallenge extends React.Component<any> {

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.ChallengeStore.values.name = e.target.value;
    };

    handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.ChallengeStore.values.description = e.target.value;
    };

    handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.ChallengeStore.values.category = e.target.value;
    };

    handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.ChallengeStore.createChallenge();
    };


    render() {
        const { currentUser } = this.props.UserStore;
        const { values, errors, inProgress } = this.props.ChallengeStore;

        if (!inProgress && this.props.ChallengeStore.currentChallenge) {
            this.props.history.replace("/challenge/" + this.props.ChallengeStore.currentChallenge.id);
        }

        if (currentUser) {
            return (
                <div className="flex flex-col items-center">
                    <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-900 sm:px-6 md:px-8 lg:px-10">
                        <div className="p-6 mt-8">
                            <form action="#" onSubmit={this.handleSubmitForm}>
                                <div className="flex flex-col mb-2 my-2">
                                    <InputText name="team-invite-code" value={values.name} onChange={this.handleNameChange} type="text" placeholder="Challenge name" id="team-invite-code" />
                                </div>
                                <div className="flex flex-col mb-2 my-2">
                                    <InputText name="team-description" value={values.description} onChange={this.handleDescriptionChange} type="text" placeholder="Challenge description" id="team-description" />
                                </div>
                                <div className="flex flex-col mb-2 my-2">
                                    <InputText name="team-description" value={values.category} onChange={this.handleCategoryChange} type="text" placeholder="Challenge category" id="team-description" />
                                </div>
                                <h2 className={'text-[#ED4A50] pb-4 ' + (errors ? 'visible' : 'invisible')}>
                                    Error: {errors}
                                </h2>
                                <div className="flex w-full my-4">
                                    <Button submit={true} label="Create Challenge" color="blue" disabled={inProgress} />
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