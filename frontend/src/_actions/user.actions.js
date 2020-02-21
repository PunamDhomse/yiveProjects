import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    forgotpassword,
    getAll,
    getUsersForSearch,
    newuser,
    getById,
    updateUser,
    deleteUser,
    updateLoggedInPass,
    getUserById,
    getProfileById,
    updateLoggedInProfile,
    activate,
    updateProfilePic

};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/dashboard');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function forgotpassword(user) {
    return dispatch => {
        dispatch(request(user));
        return new Promise((resolve, reject) => {
            userService.forgotpassword(user)
                .then(
                    user => {
                        dispatch(success());
                        resolve(user);
                    },
                    error => {
                        dispatch(failure(error.toString()));
                        reject(error);
                    }
                );
        });
    };

    function request(user) { return { type: userConstants.FORGOTPASSWORD_REQUEST, user } }
    function success(user) { return { type: userConstants.FORGOTPASSWORD_SUCCESS, user } }
    function failure(error) { return { type: userConstants.FORGOTPASSWORD_FAILURE, error } }
}

// Get USER INFO FROM DB
function getUserById(id) {
    console.log("getUserById", id);
    return dispatch => {
        dispatch(request());
        console.log("crossed");
        userService.getUserById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GET_USERINFO_REQUEST } }
    function success(user) { return { type: userConstants.GET_USERINFO_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USERINFO_FAILURE, error } }
}

// Get USER PROFILE INFO FROM DB
function getProfileById(id) {
    return dispatch => {
        dispatch(request());
        return new Promise((resolve, reject) => {
            userService.getProfileById(id)
                .then(
                    user => {
                        dispatch(success(user))
                        return resolve(user);
                    },
                    error => dispatch(failure(error.toString()))
                );
        });
    };

    function request() { return { type: userConstants.GET_PROFILE_REQUEST } }
    function success(user) { return { type: userConstants.GET_PROFILE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_PROFILE_FAILURE, error } }
}


// UPDATE LOGGED_IN USER PROFILE
function updateLoggedInProfile(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                result => {
                    userService.updateProfile(user)
                        .then(
                            result => {
                                dispatch(success());
                                userService.getProfileById(user._id)
                                    .then(
                                        user => dispatch(success1(user))
                                    );
                                dispatch(alertActions.success('Profile updated!'));

                            },
                            error => {
                                dispatch(failure(error.toString()));
                                dispatch(alertActions.error(error.toString()));
                            }
                        );
                    // dispatch(success());
                    // history.push('/users');
                    // dispatch(alertActions.success('User updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success1(user) { return { type: userConstants.GET_PROFILE_SUCCESS, user } }
    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(result) { return { type: userConstants.UPDATE_SUCCESS, result } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }

}

function updateProfilePic(user, formData) {
    return dispatch => {
        dispatch(request(user));

        userService.updateProfilePic(user, formData)
            .then(
                result => {
                    userService.getProfileById(user)
                        .then(
                            user => dispatch(success(user)),
                            error => dispatch(failure(error.toString()))
                        );
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_PROFILE_REQUEST } }
    function success(user) { return { type: userConstants.GET_PROFILE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_PROFILE_FAILURE, error } }

}

// CHANGE PASSWORD
function updateLoggedInPass(newpassword) {
    return dispatch => {
        dispatch(request(newpassword));
        console.log("request done", newpassword);
        userService.update(newpassword)
            .then(
                newpassword => {
                    dispatch(success());
                    history.push('/changepassword');
                    dispatch(alertActions.success('Password is updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(newpassword) { return { type: userConstants.UPDATE_REQUEST, newpassword } }
    function success(newpassword) { return { type: userConstants.UPDATE_SUCCESS, newpassword } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }

}

function newuser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/users');
                    dispatch(alertActions.success('New user added successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function updateUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/users');
                    dispatch(alertActions.success('User updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

// Get Selective Users from DB
function getById(id) {
    return dispatch => {
        dispatch(request());
        userService.getById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETUSER_REQUEST } }
    function success(user) { return { type: userConstants.GETUSER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETUSER_FAILURE, error } }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}



// Get All Users from DB
function getAll() {
    return dispatch => {
        dispatch(request());
        //console.log("reaching");
        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getUsersForSearch(getby = 'all', byId = '',  body) {
    debugger;
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());
            console.log("reaching to all users");
            userService.getUsersForSearch(getby,byId, body)
                .then(
                    users => {
                        dispatch(success(users));
                        resolve(users);
                    },
                    error => dispatch(failure(error.toString()))
                );
        });
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
    return dispatch => {
        dispatch(request(id));
        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function activate(user) {
    return dispatch => {
        dispatch(request(user));
        userService.update(user)
            .then(
                user => dispatch(success(user.data)),
                error => dispatch(failure(user, error.toString()))
            );
    };

    function request(user) { return { type: userConstants.ACTIVATE_REQUEST, user } }
    function success(user) { return { type: userConstants.ACTIVATE_SUCCESS, user } }
    function failure(user, error) { return { type: userConstants.ACTIVATE_FAILURE, user, error } }
}