// import superagentPromise from 'superagent-promise';
import superagent from 'superagent';
import CommonStore from './store/CommonStore';
import AuthStore from './store/AuthStore';
import {User} from './store/UserStore';

// const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = '/api';

const tokenPlugin = (req:superagent.SuperAgentRequest) => {
  if (CommonStore.token) {
    req.set('Authorization', `Bearer ${CommonStore.token}`);
  }
};

const requests = {
  del: (url: string) =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin),
  get: (url: string) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin),
  put: (url: string, body: {}) =>
    superagent
      .put(`${API_ROOT}${url}`)
      .set('Content-Type', 'application/json')
      .use(tokenPlugin)
      .send(body),
  post: (url: string, body: {}) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .set('Content-Type', 'application/json')
      .use(tokenPlugin)
      .send(body)
};

const Auth = {
  current: () =>
    requests.get('/user/self'),
  login: (username: string, password: string) =>
    requests.post('/user/login', { name:username, password }),
  register: (username: string, email: string, password: string) =>
    requests.post('/user/signup', { name:username, email, password }),
  forgotpassword: (username: string, email: string) =>
    requests.post('/user/forgotpassword', { name:username, email }),
  recoverpassword: (id: number, password: string, resetPasswordCode:string) =>
    requests.post('/user/recoverpassword/'+resetPasswordCode, { id, password }),
  save: (user: User) =>
    requests.put('/user/self', { user })
};

export default {
  Auth,
  requests
};