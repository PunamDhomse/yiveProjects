import config from 'config';
import { authHeader } from '../_helpers';

export const commonService = {
    getCountries,
    getRegions
};


function getCountries() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached");

    return fetch(`${config.apiUrl}/country/list`, requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getRegions(countryId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached");

    return fetch(`${config.apiUrl}/country/regions/${countryId}`, requestOptions).then(handleResponse);
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
        console.log('this is --------', data);
        return data;
    });
}