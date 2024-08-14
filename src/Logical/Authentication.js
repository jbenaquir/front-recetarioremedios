import { cookiesManagement } from "./CookiesManagement";

class Authentication {
    GetToken = () => {
        const cookieToken = cookiesManagement.getCookie("token");

        //https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript
        return !cookieToken ? null : JSON.parse(cookieToken);
    };

    authenticated() {
        const token = this.GetToken();

        return token != null;
    }

    GetAuthorizationHeaders(){
        const token = JSON.stringify(this.GetToken());
        const headers = new Headers();
        headers.append("Authorization", btoa(token));
    
        return headers;
    }
}

export const authentication = new Authentication();