import { cookiesManagement } from "../Logical/CookiesManagement";

const englishObject = {
    languajeElectorTag: "Languaje",
    addAccount: "Create Account",
    login: "Log In"
};

const spanishObject = {
    languajeElectorTag: "Lenguaje",
    addAccount: "Crear cuenta",
    login: "Acceder"
};

const languajes = [
    "english",
    "spanish"
]

//check if a method has or does
//mehtod: check if cookie has value
export const GetLanguaje = () => {
    const cookieToken = cookiesManagement.getCookie("languaje");

    //https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript
    return !cookieToken ? "english" : cookieToken.toString();
};

export const setCookie = (token, datefinish) => {
    const cookie = `languaje=${token};expires=${datefinish}`;

    document.cookie = cookie;
};


export const langReference = (languaje) => {
    if (languaje === "english")
        return englishObject;


    if (languaje === "spanish")
        return spanishObject;


    return englishObject;
};


