import { cookiesManagement } from "./CookiesManagement";

class Authentication {
    GetCurrentRoleId = () => {
        const token = this.GetToken();

        if (token != null)
        {
            return token.roleId;
        }

        return null;
    };

    IsAdmin = () => {
        const token = this.GetToken();

        if (token != null)
        {
            // eslint-disable-next-line eqeqeq
            return token.roleId == 1;
        }

        return false;
    };

    IsCompanyOwner = () => {
        const token = this.GetToken();

        if (token != null)
        {
            // eslint-disable-next-line eqeqeq
            return token.roleId == 3; //check with api getting what is the id for COMPANY_OWNER
        }

        return false;
    };

    GetCurrentUserId = () => {
        const token = this.GetToken();

        if (token != null)
        {
            return token.userId;
        }

        return null;
    };

    GetCurrentUserName = () => {
        const token = this.GetToken();

        if (token != null)
        {
            return token.userName;
        }

        return null;
    };

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