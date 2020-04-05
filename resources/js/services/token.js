import Cookie from "json-cookie";

const TOKEN_KEY = 'token';

export default {
    getToken() {
        return Cookie.get(TOKEN_KEY);
    },
    setToken(token, expires = 365) {
        Cookie.set(TOKEN_KEY, token, {expires});
    },
    deleteToken() {
        Cookie.delete(TOKEN_KEY);
    }
}
