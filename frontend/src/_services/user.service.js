import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    forgotpassword,
    getAll,
    getUsersForSearch,
    getById,
    update,
    delete: _delete,
    newuser,
    getUserById,
    getProfileById,
    updateProfile,
    updateProfilePic
};



function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    console.log("Inside login");
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiii"+`${config.apiUrl}/user/authenticate`);
    return fetch(`${config.apiUrl}/user/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached on user GETALL Function");

    return fetch(`${config.apiUrl}/user/adminlist`, requestOptions).then(handleResponse);
}


function getUsersForSearch(getby, byId, data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    console.log("reached on user GETALL Function");

    return fetch(`${config.apiUrl}/user/list/${getby}/${byId}`, requestOptions).then(handleResponse);
}




function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/user/${id}`, requestOptions).then(handleResponse);
}

function getUserById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/user/${id}`, requestOptions).then(handleResponse);
}

function getProfileById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/user/profile/${id}`, requestOptions).then(handleResponse);
}

function forgotpassword(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/user/forgotpassword`, requestOptions).then(handleResponse);
}


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/user/register`, requestOptions).then(handleResponse);
}

function newuser(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/user/register`, requestOptions).then(handleResponse);
}

function update(user) {
    console.log('updating user', user);
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/user/${user._id}`, requestOptions).then(handleResponse);;
}


function updateProfile(user) {
    const userDetail_id = user.user_id ? user.user_id : user._id;
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/userinfo/profile/${userDetail_id}`, requestOptions).then(handleResponse);;
}


function updateProfilePic(user, formData) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader() },
        body: formData
    };

    return fetch(`${config.apiUrl}/userinfo/updatePic/${user}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/user/${id}`, requestOptions).then(handleResponse);
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