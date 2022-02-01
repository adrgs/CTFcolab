import { inject, observer } from "mobx-react";
import * as React from 'react';
import Button from "../../misc/Button";
import { DatePicker } from "../../misc/DatePicker";
import { DateTimePicker } from "../../misc/DateTimePicker";
import DescriptionList from "../../misc/DescriptionList";
import InputText from "../../misc/InputText";

@inject("UserStore", "CompetitionStore")
@observer
export default class CreateCompetition extends React.Component<any> {

    componentWillMount() {

        this.props.CompetitionStore.forgetCompetition();

    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.CompetitionStore.values.name = e.target.value;
    };

    handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.CompetitionStore.values.description = e.target.value;
    };

    handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.CompetitionStore.values.startDate = e.target.value;
    };

    handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.CompetitionStore.values.endDate = e.target.value;
    };

    handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.CompetitionStore.createCompetition();
    };


    render() {
        const { currentUser } = this.props.UserStore;
        const { values, errors, inProgress } = this.props.CompetitionStore;

        if (!this.props.CompetitionStore.inProgress && this.props.CompetitionStore.currentCompetition) {
            this.props.history.replace("/competition/" + this.props.CompetitionStore.currentCompetition.id);
        }

        if (currentUser) {
            return (
                <div className="flex flex-col items-center">
                    <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-900 sm:px-6 md:px-8 lg:px-10">
                        <div className="p-6 mt-8">
                            <form action="#" onSubmit={this.handleSubmitForm}>
                                <div className="flex flex-col mb-2 my-2">
                                    <InputText name="team-invite-code" value={values.name} onChange={this.handleNameChange} type="text" placeholder="Competition name" id="team-invite-code" />
                                </div>
                                <div className="flex flex-col mb-2 my-2">
                                    <InputText name="team-description" value={values.description} onChange={this.handleDescriptionChange} type="text" placeholder="Competition description" id="team-description" />
                                </div>
                                <div className="flex flex-col mb-2 my-2">
                                    Start date
                                    <DateTimePicker onChange={this.handleStartDateChange} />
                                </div>
                                <div className="flex flex-col mb-2 my-2">
                                    End date
                                    <DateTimePicker onChange={this.handleEndDateChange} />
                                </div>
                                <h2 className={'text-[#ED4A50] pb-4 ' + (errors ? 'visible' : 'invisible')}>
                                    Error: {errors}
                                </h2>
                                <div className="flex w-full my-4">
                                    <Button submit={true} label="Create Competition" color="blue" disabled={inProgress} />
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