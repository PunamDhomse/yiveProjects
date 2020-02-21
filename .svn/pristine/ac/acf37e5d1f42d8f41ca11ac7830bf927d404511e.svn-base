import config from 'config';
import { authHeader } from '../_helpers';

export const businessMngService = {
    getAllCustomers,
    getCustomerById
};

function getAllCustomers(getby, byId, data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    console.log("reached");

    return fetch(`${config.apiUrl}/businessmng/list/${getby}/${byId}`, requestOptions).then(handleResponse);
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getCustomerById(user_id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached in services");

    return fetch(`${config.apiUrl}/businessmng/info/${user_id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(response)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.href = '/';
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log('this is ', data);
        return data;
    });
}