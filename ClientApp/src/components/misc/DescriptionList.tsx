import React from 'react';

interface Props {
    dictObject: any
}

const DescriptionList = (props: Props) => {
    return (
        <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        {Object.keys(props.dictObject).map((key) => {
                            return (
                                <>
                                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{props.dictObject[key]}</dd>
                                </>
                            )
                        })}
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default DescriptionList;