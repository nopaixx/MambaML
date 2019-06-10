export function authHeader() {
    // return authorization header with jwt token
    if (localStorage.getItem('token')){

		return { 'Authorization': 'Bearer ' + localStorage.getItem('token')};
    }
    return {}
    /*let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }*/
}