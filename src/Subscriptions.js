//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";

import { useEffect, useState } from 'react';
import { authentication } from './Logical/Authentication.js';
import netapi from './variables/apiurls.js';

function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);

    function GetSubscriptions() {
        return;

        fetch(`${netapi}/Subscriptions/search`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setSubscriptions(data);
            })
            .catch((error) => console.log("Something happened getting products: " + error));
    }

    //loads when component mounts
    useEffect(() => {
        const fetchData = async () => {
            GetSubscriptions();
        }

        fetchData();
    }, []);

    useEffect(() => {

    }, []);

    function GoToChat(subscription) {
        window.location.href = `/chat/${subscription.chatId}`;
    }

    function GoToDelete(Subscription) {
        if (!window.confirm(langReference(GetLanguaje()).promptDeleteSubscription))
            return;

        fetch(`${netapi}/Subscriptions/${Subscription.id}`,
            {
                method: 'DELETE',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => {
                if (response.status === 200)
                    GetSubscriptions();
            })
            .catch((error) => console.log("Something happened deleting subscription: " + error));
    }

    return (
        <div class="grid">
            <div class="row" style={{ margin: "20px" }}>
                <h1 class="col col-9" style={{ textAlign: "center", padding: "9px" }}>{langReference(GetLanguaje()).subscriptions}</h1>
            </div>
            <div>
                <table style={{ margin: "0px auto" }}>
                    <tbody>
                        {subscriptions.length === 0 &&
                            <tr>
                                <td colSpan={2}>{langReference(GetLanguaje()).thereAreNOElementsToShow}</td>
                            </tr>}
                        {subscriptions.map(subscription => (
                            <tr key={subscription.id}>
                                <td style={{ textAlign: "center" }}>
                                    {subscription.chatId}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        style={{ margin: "5px", minWidth: "62px" }}
                                        class="btn btn-primary"
                                        title={langReference(GetLanguaje()).view}
                                        onClick={() => GoToChat(subscription)}>
                                        <i class="bi-chat"></i>
                                        <div>
                                            {langReference(GetLanguaje()).message}
                                        </div>
                                    </button>
                                    <button
                                        style={{ margin: "5px" }}
                                        class="btn btn-danger"
                                        title={langReference(GetLanguaje()).delete}
                                        onClick={() => GoToDelete(subscription)}>
                                        <i class="bi-trash"></i>
                                        <div>
                                            {langReference(GetLanguaje()).delete}
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Subscriptions;