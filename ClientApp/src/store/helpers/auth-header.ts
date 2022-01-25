interface IUserToken {
    token: string;
}

export function AuthHeader() {
    let user: IUserToken = JSON.parse(localStorage.getItem('user') || '');

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return { 'Authorization': 'None' };
    }
}