// import superagentPromise from 'superagent-promise';
import superagent from 'superagent';
import CommonStore from './store/CommonStore';
import AuthStore from './store/AuthStore';
import {User} from './store/UserStore';

// const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = '/api';

type Response = {
    response?: {
        status: number
    }
    body: {} | string
}

const handleErrors = (err: Response) => {
  if (err && err.response && err.response.status === 401) {
    AuthStore.logout();
  }
  return err;
};

const responseBody = (res: Response) => res.body;

const tokenPlugin = (req:superagent.SuperAgentRequest) => {
  if (CommonStore.token) {
    req.set('Authorization', `Bearer ${CommonStore.token}`);
  }
};

const requests = {
  del: (url: string) =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin).then()
      .catch(handleErrors)
      .then(responseBody),
  get: (url: string) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .catch(handleErrors)
      .then(responseBody),
  put: (url: string, body: {}) =>
    superagent
      .put(`${API_ROOT}${url}`)
      .set('Content-Type', 'application/json')
      .use(tokenPlugin)
      .send(body)
      .catch(handleErrors)
      .then(responseBody),
  post: (url: string, body: {}) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .set('Content-Type', 'application/json')
      .use(tokenPlugin)
      .send(body)
      .catch(handleErrors)
      .then(responseBody),
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email: string, password: string) =>
    requests.post('/user/login', { user: { email, password } }),
  register: (username: string, email: string, password: string) =>
    requests.post('/user/signup', { user: { username, email, password } }),
  save: (user: User) =>
    requests.put('/user', { user })
};

export default {
  Auth,
};