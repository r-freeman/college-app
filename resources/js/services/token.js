import Cookie from "json-cookie";

const TOKEN_KEY = 'token';

export default {
    getToken() {
        return Cookie.get(TOKEN_KEY);
    },
    setToken(token) {
        Cookie.set(TOKEN_KEY, token);
    },
    deleteToken() {
        Cookie.delete(TOKEN_KEY);
    }
}
