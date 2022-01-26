import * as React from 'react';
import NavMenu, { HeaderLink } from './NavMenu';
import { useTranslation } from 'react-i18next';
import i18n from '../../services/i18n';
import { inject, observer } from 'mobx-react';

@inject("AuthStore")
@observer
export default class Layout extends React.PureComponent<any, { children?: React.ReactNode }> {

    public render() {
        

        let links = [
            new HeaderLink(i18n.t('home_page'), '/'),
        ];

        if (!this.props.AuthStore.IsAuthenticated) {
            links = links.concat(
                [
                    new HeaderLink(i18n.t('login'), '/login'),
                    new HeaderLink(i18n.t('sign_up'), '/signup'),
                ]
            );
        } else {
            links = links.concat([
                new HeaderLink(i18n.t('logout'), '/logout'),
            ]);
        }

        return (
            <div className="mx-auto h-full" style={{ minHeight: 85 + 'vh' }}>
                <div className="relative z-10 bg-white dark:bg-gray-800 overflow-hidden lg:w-full h-full">
                    <main className="bg-gray-100 dark:bg-gray-800 dark:text-white h-screen overflow-hidden relative">
                        <div>
                            <NavMenu
                                forceMenuOpenInMobile={false}
                                forceDDMOpenInMobile={false}
                                links={links}
                                hideGitHubLink={true}
                                hideHelp={true}
                                alignRight={true}
                            />
                        </div>
                        <div className="flex items-start justify-between overflow-y-auto custom-scrollbar dark:custom-scrollbar overflow-x-hidden h-full flex-1">
                            <div className="flex flex-col w-full md:space-y-4 pt-4">
                                {this.props.children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}