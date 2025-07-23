import { cookiesManagement } from "../Logical/CookiesManagement";

const englishObject = {
    languajeElectorTag: "Languaje",
    addAccount: "Create Account",
    login: "Log In"
    ,close: "Close"
    ,slogan: "This app was made to help persons and the medical assistance to cure them."
    ,or: "Or"
    ,password: "Password"
    ,profile: "Profile"
    ,authenticate: "Authenticate"
    ,create: "Create"
    ,client: "Client"
    ,channel: "Channel"
    ,company: "Company"
    ,edit: "Edit"
    ,choose: "Choose"
    ,home:"Home"
    ,thereAreNOElementsToShow: "There are no elements to show"
    ,delete: "Delete"
    ,back: "Back"
    ,requiredFields: "Required fields"
    ,phone: "Phone number"
    ,view: "View"
    ,cookiesMessage: "Please accept cookies (vegan please)."
    ,accept: "Accept"
    ,modify: "Modify"
    ,my: "My"
    ,getMessages: "Get Messages Update"
    ,go: "Go"
    ,message: "Message"
    ,isEmpty: "is empty"
    ,sendingMessage: "Sending message"
    ,sentMessage: "Message sent"
    ,save: "Save"
    ,session: "Session"
    ,scripts: "Scripts"
    ,udpate: "Update"
};

const spanishObject = {
    languajeElectorTag: "Lenguaje",
    addAccount: "Crear cuenta",
    login: "Acceder"
    ,slogan: "Esta aplicación se realizó para ayudar personas y equipo médico a guiarles en la curación."
    ,or: "Ó"
    ,password: "Contraseña"
    ,profile: "Perfil"
    ,authenticate: "Authenticarse"
    ,create: "Crear"
    ,client: "Cliente"
    ,close: "Cerrar"
    ,channel: "Canal ó Channel"
    ,company: "Compañía"
    ,edit: "Editar"
    ,choose: "Elegir"
    ,save: "Salvar"
    ,home:"Inicio"
    ,thereAreNOElementsToShow: "No hay objeto qué enseñar"
    ,delete: "Eliminar"
    ,back: "Volver"
    ,requiredFields: "Campos requeridos"
    ,phone: "Teléfono o número celular"
    ,view: "Ver"
    ,cookiesMessage: "Por favor acepte el uso de cookies."
    ,accept: "Aceptar"
    ,getMessages: "Obtener mensajes"
    ,go: "Ir"
    ,message: "Mensaje"
    ,my: "Mi"
    ,modify: "Modificar"
    ,product: "Product"
    ,isEmpty: "está vacío"
    ,scripts: "Guión"
    ,sendingMessage: "Mensaje en proceso"
    ,sentMessage: "Mensaje se envío"
    ,session: "Sesión"
    ,udpate: "Actualizar"
};

const frenchObject = {
    languajeElectorTag: "Langue",
    addAccount: "Créer compte",
    login: "Connexion"
    ,close: "Fermer"
    ,slogan: "Cette app a été crée par aideer les parsons et le equipe de médecints dans la soin."
    ,or: "Ou"
    ,profile: "Profil"
    ,password: "Le Mot de passe"
    ,authenticate: "Authentifier"
    ,create: "Crée"
    ,client: "Client"
    ,channel: "Channel"
    ,company: "Compagnie"
    ,home:"Début"
    ,edit: "Éditer"
    ,choose: "Choisir"
    ,save: "Sauver"
    ,thereAreNOElementsToShow: "Il n'y a aucun élément à afficher"
    ,delete: "Supprimer"
    ,back: "Retourner"
    ,requiredFields: "Champes requeris"
    ,phone: "Téléphone"
    ,modify: "Édite"
    ,my: "Mon"
    ,view: "Voir"
    ,product: "Product"
    ,cookiesMessage: "S'il vous plaît"
    ,accept: "Accepter"
    ,getMessages: "Obtenir la messagerie"
    ,go: "Aller"
    ,message: "Message"
    ,isEmpty: "est vide"
    ,sendingMessage: "Message en envoi"
    ,sentMessage: "Message envoyé"
    ,session: "Session"
    ,scripts: "Instructions"
    ,update: "Mettre à jour"
};

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

    if (languaje === "french")
        return frenchObject;

    //default
    return englishObject;
};


