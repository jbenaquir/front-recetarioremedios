import { cookiesManagement } from "./CookiesManagement";

class Authentication {
    GetToken = () => {
        const cookieToken = cookiesManagement.getCookie("token");

        //https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript
        return !cookieToken ? null : JSON.parse(cookieToken);
    };

        // eslint-disable-next-line no-unused-vars
    authenticated() {
        const token = this.GetToken();

        return token != null;
    }
}

export const authentication = new Authentication();