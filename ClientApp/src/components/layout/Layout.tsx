import * as React from 'react';
import NavMenu, { HeaderLink, DDM } from './NavMenu';
import { useTranslation } from 'react-i18next';
import i18n from '../../services/i18n';
import { inject, observer } from 'mobx-react';
import { DDMItem } from '../misc/DropDownMenu';
import { Team } from '../../store/TeamStore';

@inject("AuthStore", "UserStore")
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
            if (this.props.UserStore.currentUser && this.props.AuthStore.isAuthorized('Admin')) {
                links = links.concat([
                    new HeaderLink(i18n.t('users'), '/users'),
                ]);
            }
            links = links.concat([
                new HeaderLink(i18n.t('profile'), '/profile'),
                new HeaderLink(i18n.t('logout'), '/logout'),
            ]);
        }

        let ddmItems : DDM[] = [  
        ];
        if (this.props.UserStore.currentUser) 
        {
            ddmItems = [
                {'label':'Teams', 'items': [{'label':'Join Team', 'link':'/team/join'}]}
            ];

            this.props.UserStore.currentUser.teams.map((team: Team) => {
                ddmItems[0].items.push(
                    {'label': team.name, 'link': '/team/' + team.id}
                );
            })
        }
        if (this.props.UserStore.currentUser && this.props.AuthStore.isAuthorized('Admin')) {
            ddmItems[0].items.unshift({'label':'All Teams', 'link':'/team/all'});
            ddmItems[0].items = ddmItems[0].items.concat(
                [
                    {'label':'Create Team', 'link':'/team/create'}
                ]       
            );
        }

        return (
            <div className="mx-auto h-full" style={{ minHeight: 85 + 'vh' }}>
                <div className="relative z-10 bg-white dark:bg-gray-800 overflow-hidden lg:w-full h-full">
                    <main className="bg-gray-100 dark:bg-gray-800 dark:text-white h-screen overflow-hidden relative">
                        <div>
                            <NavMenu
                                forceMenuOpenInMobile={false}
                                forceDDMOpenInMobile={false}
                                ddmItems={ddmItems}
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