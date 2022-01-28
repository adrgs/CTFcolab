import React from 'react';
import _uniqueId from 'lodash/uniqueId';

interface Props {
    dictObject: any
    keysWhitelist?: string[]
}

const DescriptionList = (props: Props) => {
    return (
        <div className="bg-white dark:bg-gray-900 max-w-2xl shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="border-t border-gray-200 dark:border-black">
                <dl>
                    <div key={_uniqueId('dl-')} className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        {Object.keys(props.dictObject).map((key) => {
                            if (!props.keysWhitelist || props.keysWhitelist.includes(key)) {
                                var val = props.dictObject[key];
                                if (typeof val == "object") {
                                    val = JSON.stringify(val);
                                }
                                return (
                                    <>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-white">{key}</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{val}</dd>
                                    </>
                                )
                            }
                        })}
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default DescriptionList;