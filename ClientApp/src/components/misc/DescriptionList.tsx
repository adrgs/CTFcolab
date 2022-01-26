import React from 'react';
import _uniqueId from 'lodash/uniqueId';

interface Props {
    dictObject: any
}

const DescriptionList = (props: Props) => {
    return (
        <div className="bg-white dark:bg-gray-900 max-w-2xl shadow overflow-hidden sm:rounded-lg">
            <div className="border-t border-gray-200 dark:border-black">
                <dl>
                    <div key={_uniqueId('dl-')} className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        {Object.keys(props.dictObject).map((key) => {
                            return (
                                <>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-white">{key}</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{props.dictObject[key]}</dd>
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