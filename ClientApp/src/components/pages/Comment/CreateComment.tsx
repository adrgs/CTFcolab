import { inject, observer } from "mobx-react";
import * as React from 'react';
import Button from "../../misc/Button";
import { DatePicker } from "../../misc/DatePicker";
import { DateTimePicker } from "../../misc/DateTimePicker";
import DescriptionList from "../../misc/DescriptionList";
import InputArea from "../../misc/InputArea";
import InputText from "../../misc/InputText";

@inject("UserStore", "ChallengeStore")
@observer
export default class CreateComment extends React.Component<any> {

    handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.ChallengeStore.values.text = e.target.value;
    };

    handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.ChallengeStore.createComment();
        this.props.history.replace("/challenge/" + this.props.ChallengeStore.currentChallenge.id);
    };


    render() {
        const { currentUser } = this.props.UserStore;
        const { values, errors, inProgress, currentChallenge } = this.props.ChallengeStore;

        if (currentChallenge) {
            return (
                <div className="flex flex-col items-center">
                    <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-900 sm:px-6 md:px-8 lg:px-10">
                        <div className="p-6 mt-8">
                            <form action="#" onSubmit={this.handleSubmitForm}>
                                <div className="flex flex-col mb-2 my-2">
                                    <InputArea onChange={this.handleTextChange}/>
                                </div>
                                <h2 className={'text-[#ED4A50] pb-4 ' + (errors ? 'visible' : 'invisible')}>
                                    Error: {errors}
                                </h2>
                                <div className="flex w-full my-4">
                                    <Button submit={true} label="Create Comment" color="blue" disabled={inProgress} />
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