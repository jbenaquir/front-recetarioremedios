//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje, setLanguajeCookie
} from "../langs/languajes.js";

function LanguajePicker() {
    //const [currentLanguaje, set]

    
    //mehtod: get value of cookie
    //mehtod: check elected languaje
    const onChangeLanguaje = (languajeElectedControl) => {
        const languajeElected = languajeElectedControl.target.value;
        //clean cookie
        setLanguajeCookie("");
        setLanguajeCookie(languajeElected);
        window.location.reload();
    };

/*
    //NOT
    //set languaje file
    const getLanguajeFile = () => {
        const languaje = GetLanguaje();
        const filePath = `assets/langs/lang-${languaje}.json`;

        return filePath;
    }

    //NOT YET
    const getLanguajeRefsObject = async () => {
        const uriToFetch = getLanguajeFile();

        //dont use a fetch, load it using a variable file with import
        await fetch(uriToFetch)
            .then(returnedObj => returnedObj.json())
            .then(data => {

                return {
                    languajeElectorTag: data["languajeElectorTag"]
                };

            });
    };
*/
    //every component require know the languaje set in cookies then load the languajefile 
    //and get the required languaje variables

    return (
        <>
            <div>

                <label htmlFor="languaje" >
                    {langReference(GetLanguaje()).languajeElectorTag}:
                </label >
                <select name="languaje" id="languaje" defaultValue={GetLanguaje()} onChange={onChangeLanguaje}>
                    <option value="english">English</option>
                    <option value="spanish">Español</option>
                    <option value="french">Français</option>
                </select>
            </div>
        </>
    );
}


export default LanguajePicker;