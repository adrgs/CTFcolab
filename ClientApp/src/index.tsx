import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import AuthStore from './store/AuthStore';
import CommonStore from './store/CommonStore';
import UserStore from './store/UserStore';
import TeamStore from './store/TeamStore';
import CompetitionStore from './store/CompetitionStore';
import ChallengeStore from './store/ChallengeStore';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

const stores = {
    AuthStore,
    CommonStore,
    UserStore,
    TeamStore,
    CompetitionStore,
    ChallengeStore
};

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();