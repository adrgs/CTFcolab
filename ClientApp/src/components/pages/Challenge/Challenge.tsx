import { inject, observer } from "mobx-react";
import * as React from 'react';
import DescriptionList from "../../misc/DescriptionList";
import _uniqueId from 'lodash/uniqueId';
import Button from "../../misc/Button";
import InputText from "../../misc/InputText";

@inject("ChallengeStore", "UserStore")
@observer
export default class Challenge extends React.Component<any> {
    componentWillMount() {

        this.props.ChallengeStore.getChallenge(this.props.match.params.challengeid);

        this.createComment = this.createComment.bind(this);
        this.deleteChallenge = this.deleteChallenge.bind(this);
        this.goToComment = this.goToComment.bind(this);
        this.solveToggle = this.solveToggle.bind(this);
        this.submitFlag = this.submitFlag.bind(this);
    }

    componentDidUpdate() {
        const { currentChallenge } = this.props.ChallengeStore;
        if (currentChallenge && currentChallenge.id.toString() != this.props.match.params.challengeid) {
            this.props.ChallengeStore.getChallenge(this.props.match.params.challengeid);
        }
    }

    createComment() {
        this.props.history.replace("/comment/create/" + this.props.match.params.challengeid);
    }

    deleteChallenge() {
        this.props.ChallengeStore.deleteChallenge();
        this.props.history.replace("/");
    }

    goToComment(e: React.MouseEvent<HTMLButtonElement>): void {
        this.props.history.replace("/comment/" + (e.target as HTMLButtonElement).value);
    }

    solveToggle(e: React.MouseEvent<HTMLButtonElement>): void {
        this.props.ChallengeStore.values.solved = !this.props.ChallengeStore.values.solved;
        this.props.ChallengeStore.updateChallenge();
    }

    submitFlag(e: React.MouseEvent<HTMLButtonElement>): void {
        this.props.ChallengeStore.updateChallenge();
    }

    handleFlagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.ChallengeStore.values.flag = e.target.value;
    };

    render() {
        const { values, currentChallenge } = this.props.ChallengeStore;
        const { currentUser } = this.props.UserStore;

        if (currentChallenge) {
            return (
                <>
                    <div className="flex relative z-20 items-center">
                        <div className="container mx-auto px-6 p-6 flex flex-col justify-between items-center relative py-8 bg-white dark:bg-gray-800 ">
                            <div className="flex flex-col">
                                <DescriptionList dictObject={currentChallenge} keysBlacklist={['comments', 'team', 'id', 'flag', 'solved']} />
                                <InputText name="flag" value={values.flag} disabled={values.solved} onChange={this.handleFlagChange} type="text" placeholder="Flag placeholder" id="flag" />
                                <Button onClick={this.submitFlag} label="Submit flag" color="purple" disabled={values.solved} />
                                <Button onClick={this.solveToggle} label={`Mark challenge as ${values.solved ? 'un' : ''}solved`} color="blue" />
                            </div>
                            {
                                currentUser && currentUser.role == "Admin" && 
                                <div className="flex flex-col my-4">
                                    <Button onClick={this.deleteChallenge} label="Delete Challenge" color="red" />
                                </div>
                            }
                            <h1>Comments</h1>
                            { (currentChallenge && currentChallenge.comments && currentChallenge.comments.length > 0 &&
                                currentChallenge.comments.map((comment: any) => {
                                    return (<div key={_uniqueId('comment')} className="flex flex-col">
                                        <DescriptionList dictObject={comment} keysBlacklist={['id', 'comments', 'challenge', 'comments']} />
                                    </div>)
                                })
                                ) || (<h1><br></br>No comments found.</h1>)
                            }
                            {
                                currentUser && 
                                <div className="flex flex-col my-4 mb-16">
                                    <Button onClick={this.createComment} label="Create comment" color="green" />
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