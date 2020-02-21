import config from 'config';
import { authHeader } from '../_helpers';

export const deviceService = {
    getAllDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice
};

function getAllDevices(business_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/device/list/${business_id}`, requestOptions).then(handleResponse);
}

function getDeviceById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/device/get/${id}`, requestOptions).then(handleResponse);
}

function createDevice(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/device/create`, requestOptions).then(handleResponse);
}


function updateDevice(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/device/update/${data._id}`, requestOptions).then(handleResponse);
}

function deleteDevice(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/device/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.href = '/';
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}