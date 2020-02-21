import config from 'config';
import { authHeader } from '../_helpers';

export const locationmanagerService = {
    getAllLocationManagers,
    getLocationManagerById,
    getAllReports
};

function getAllLocationManagers(getby, byId, data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    console.log("reached");

    return fetch(`${config.apiUrl}/locationManager/list/${getby}/${byId}`, requestOptions).then(handleResponse);
}

function getAllReports(filters, date, getby, byId) {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ filters: filters, date: date })
        };
        fetch(`${config.apiUrl}/reports/list/${getby}/${byId}`, requestOptions).then((res) => {
            res.text().then(text => {
                let data = text && JSON.parse(text);
                if (!res.ok) {
                    if (res.status === 401) {
                        // auto logout if 401 response returned from api
                        logout();
                        window.location.href = '/';
                    }

                    const error = (data && data.message) || res.statusText;
                    return reject(error);
                }
                return resolve(data);
            })
        });
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getLocationManagerById(user_id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached in services");

    return fetch(`${config.apiUrl}/locationManager/info/${user_id}`, requestOptions).then(handleResponse);
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