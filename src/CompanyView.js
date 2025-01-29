import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';

function CompanyView() {
    const { id } = useParams();
    const [company, setCompany] = useState({});

    function GetCompany(id) {
        fetch(`https://localhost:7222/api/companies/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setCompany(data);
            })
            .catch((error) => console.log("Something happened getting company: " + error));
    }

    useEffect(() => {
        GetCompany(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Company: </h1>
            <p>
                {company.name}
            </p>
        </div>
    )
}

export default CompanyView;