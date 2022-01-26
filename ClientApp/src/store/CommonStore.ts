import { observable, action, reaction, makeObservable } from 'mobx';
import UserStore from './UserStore';

class CommonStore {

    @observable appName = 'CTFcolab';
    @observable token = window.localStorage.getItem('jwt') ? window.localStorage.getItem('jwt') : undefined;
    @observable appLoaded = false;
  
    @observable isLoadingTags = false;
  
    constructor() {
      makeObservable(this);
      reaction(
        () => this.token,
        token => {
          if (token) {
            window.localStorage.setItem('jwt', token);
            UserStore.pullUser();
          } else {
            window.localStorage.removeItem('jwt');
          }
        }
      );
    }
  
    @action setToken(token: string | undefined) {
      this.token = token;
    }
  
    @action setAppLoaded() {
      this.appLoaded = true;
    }
  
  }
  
  export default new CommonStore();