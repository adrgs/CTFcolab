import { inject, observer } from "mobx-react";
import * as React from 'react';
import { Link } from "react-router-dom";

@inject("AuthStore")
@observer
export default class Logout extends React.Component<any> {
    render() {
        this.props.AuthStore.logout();

        return (
            <>
                <div className="flex relative z-20 items-center">
                    <div className="container mx-auto px-6 p-6 flex flex-col justify-between items-center relative py-8 bg-white dark:bg-gray-800 ">
                        <div className="flex flex-col">
                            <h1 className="font-light w-full uppercase text-center text-4xl sm:text-5xl dark:text-white text-gray-800">
                                Logout
                            </h1>
                            <h2 className="font-light max-w-2xl mx-auto w-full text-xl dark:text-white text-gray-500 text-center py-8">
                                Click here to go to the <Link to="/">Home page</Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}