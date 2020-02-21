import config from 'config';
import { authHeader } from '../_helpers';

export const visitorService = {
    getAllVisitors,
    addNewVisitor,
    deleteVisitor,
    getVisitorsForLocation,
    getVisitorByCustId
};

function getAllVisitors(businessOwnerId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached in Vistor listing");
    if (businessOwnerId !== 'all') {
        return fetch(`${config.apiUrl}/visitor/list/${businessOwnerId}`, requestOptions).then(handleResponse);
    } else {
        return fetch(`${config.apiUrl}/visitor/visitorList`, requestOptions).then(handleResponse);
    }
}

function getVisitorsForLocation(data) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    if (data.start && data.end) {
        return fetch(`${config.apiUrl}/visitor/list/${data.start}/${data.end}/${data.loc_id}/${data.bus_id}`, requestOptions).then(handleResponse);
    } else {
        return fetch(`${config.apiUrl}/visitorlist/${data.loc_id}/${data.bus_id}`, requestOptions).then(handleResponse);
    }
}

function addNewVisitor(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/visitor/add`, requestOptions).then(handleResponse);
}

function getVisitorByCustId(id) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: '' })
    };

    return fetch(`${config.apiUrl}/visitor/${id}`, requestOptions).then(handleResponse);
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function deleteVisitor(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/visitor/delete/${id}`, requestOptions).then(handleResponse);
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