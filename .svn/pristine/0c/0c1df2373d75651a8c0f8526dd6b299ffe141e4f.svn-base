import config from 'config';
import { authHeader } from '../_helpers';

export const customerService = {
    getAllCustomers,
    getCustomerById,
    getAllReports,
    getMultipleLocs,
    addPhoto,
    getPhotos,
    editPhoto
};

function getAllCustomers(getby, byId, data) {
    debugger;
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    console.log("reached");

    return fetch(`${config.apiUrl}/customer/list/${getby}/${byId}`, requestOptions).then(handleResponse);
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

function getCustomerById(user_id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached in services");

    return fetch(`${config.apiUrl}/customer/info/${user_id}`, requestOptions).then(handleResponse);
}

function getMultipleLocs(ids, field) {

    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ids, field: field })
    };

    return fetch(`${config.apiUrl}/location/multiple`, requestOptions).then(handleResponse);
}

function addPhoto(data, id) {

    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
        body: data
    };

    return fetch(`${config.apiUrl}/photo/create/${id}`, requestOptions).then(handleResponse);
}

function editPhoto(data, id) {

    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader() },
        body: data
    };

    return fetch(`${config.apiUrl}/photo/${id}`, requestOptions).then(handleResponse);
}

function getPhotos(id) {

    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader() }
    };

    return fetch(`${config.apiUrl}/photo/${id}`, requestOptions).then(handleResponse);
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