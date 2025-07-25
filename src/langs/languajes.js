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
    ,gettingMessagesFromServer : "Getting messages from server"
    ,delete: "Delete"
    ,back: "Back"
    ,requiredFields: "Required fields"
    ,recipes: "Recipes"
    ,recipe: "Recipe"
    ,phone: "Phone number"
    ,view: "View"
    ,cookiesMessage: "Please accept cookies (vegan please)."
    ,accept: "Accept"
    ,modify: "Modify"
    ,my: "My"
    ,name: "Name"
    ,product: "Product"
    ,products: "Products"
    ,preparation: "Preparation"
    ,description: "Description"
    ,nutrients: "Nutrients"
    ,getMessages: "Get Messages Update"
    ,go: "Go"
    ,message: "Message"
    ,isEmpty: "is empty"
    ,sendingMessage: "Sending message"
    ,sentMessage: "Message sent"
    ,save: "Save"
    ,session: "Session"
    ,search: "Search"
    ,scripts: "Scripts"
    ,steps: "Steps"
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
    ,gettingMessagesFromServer : "Obteniendo mensajes"
    ,delete: "Eliminar"
    ,back: "Volver"
    ,preparation: "Preparación"
    ,requiredFields: "Campos requeridos"
    ,recipes: "Recetas"
    ,recipe: "Receta"
    ,preparation: "Preparación"
    ,products: "Productos"
    ,phone: "Teléfono o número celular"
    ,view: "Ver"
    ,cookiesMessage: "Por favor acepte el uso de cookies."
    ,accept: "Aceptar"
    ,getMessages: "Obtener mensajes"
    ,go: "Ir"
    ,message: "Mensaje"
    ,my: "Mi"
    ,modify: "Modificar"
    ,name: "Nombre"
    ,product: "Producto"
    ,description: "Descripción"
    ,nutrients: "Nutrientes"
    ,isEmpty: "está vacío"
    ,scripts: "Guión"
    ,steps: "Pasos"
    ,search: "Buscar"
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
    ,recipes: "Recettes"
    ,recipe: "Recette"
    ,preparation: "Préparation"
    ,phone: "Téléphone"
    ,modify: "Édite"
    ,my: "Mon"
    ,name: "Nom"
    ,view: "Voir"
    ,product: "Produit"
    ,products: "Produits"
    ,description: "Description"
    ,nutrients: "Nutriments"
    ,cookiesMessage: "S'il vous plaît"
    ,accept: "Accepter"
    ,getMessages: "Obtenir la messagerie"
    ,gettingMessagesFromServer : "Obtenir la messagerie"
    ,go: "Aller"
    ,message: "Message"
    ,isEmpty: "est vide"
    ,sendingMessage: "Message en envoi"
    ,sentMessage: "Message envoyé"
    ,session: "Session"
    ,scripts: "Instructions"
    ,search: "Chercher"
    ,steps: "Mesures"
    ,update: "Mettre à jour"
};

//check if a method has or does
//mehtod: check if cookie has value
export const GetLanguaje = () => {
    const cookieToken = cookiesManagement.getCookie("languaje");
    
    //https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript
    return !cookieToken ? "english" : cookieToken.toString();
};

export const setLanguajeCookie = (token, datefinish) => {
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


