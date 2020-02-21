import { customerConstants, businessConstants } from '../_constants';
import { customerService, userService, businessService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const customerActions = {
    newCustomer,
    getAllCustomers,
    deleteCustomer,
    getCustomerById,
    activate,
    updateCustomerById,
    updateProfilePic,
    getMultipleLocs,
    addPhoto,
    getPhotos,
    editPhoto
};


function newCustomer(user, file, route) {
    return dispatch => {
        dispatch(request(user));
        return new Promise((resolve, reject) => {
            userService.register(user)
                .then(
                    result => {
                        user.user_id = result.data._id; // Push the object
                        userService.updateProfile(user)
                            .then(
                                result => {
                                    if (file !== null) {
                                        let formData = new FormData();
                                        formData.append('file', file);
                                        userService.updateProfilePic(user.user_id, formData)
                                            .then(
                                                result => {
                                                    dispatch(success());
                                                    if (route !== '') {
                                                        history.push(route);
                                                    }
                                                    resolve(true);
                                                    dispatch(alertActions.success('New individual added successfully'));
                                                },
                                                error => {
                                                    dispatch(failure(error.toString()));
                                                    dispatch(alertActions.error(error.toString()));
                                                }
                                            );
                                    } else {
                                        dispatch(success());
                                        if (route !== '') {
                                            history.push(route);
                                        }
                                        resolve(true);
                                        dispatch(alertActions.success('New individual added successfully'));
                                    }
                                },
                                error => {
                                    dispatch(failure(error.toString()));
                                    dispatch(alertActions.error(error.toString()));
                                }
                            );
                    },
                    error => {
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                );
        });
    };


    function request(user) { return { type: customerConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: customerConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: customerConstants.REGISTER_FAILURE, error } }
}


// Get All Users from DB
function getAllCustomers(getby = 'all', byId = '', body) {
    debugger;
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());
            console.log("reaching to all customers");
            customerService.getAllCustomers(getby, byId, body)
                .then(
                    customer => {
                        dispatch(success(customer));
                        resolve(customer);
                    },
                    error => dispatch(failure(error.toString()))
                );
        });
    };

    function request() { return { type: customerConstants.GETALL_REQUEST } }
    function success(customer) { return { type: customerConstants.GETALL_SUCCESS, customer } }
    function failure(error) { return { type: customerConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteCustomer(id) {
    return dispatch => {
        dispatch(request(id));
        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: customerConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: customerConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: customerConstants.DELETE_FAILURE, id, error } }
}


function getMultipleLocs(id, field) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            customerService.getMultipleLocs(id, field)
                .then(
                    locs => resolve(locs)
                );
        });
    };
}


function activate(customer) {
    return dispatch => {
        // dispatch(request(customer._id));
        userService.update(customer)
            .then(
                customer => dispatch(success(customer.data)),
                error => dispatch(failure(customer, error.toString()))
            );
    };

    function request(customer) { return { type: customerConstants.ACTIVATE_REQUEST, customer } }
    function success(customer) { return { type: customerConstants.ACTIVATE_SUCCESS, customer } }
    function failure(customer, error) { return { type: customerConstants.ACTIVATE_FAILURE, customer, error } }
}


// Get Selective Customer from DB
function getCustomerById(id) {
    return dispatch => {
        dispatch(request());
        return new Promise((resolve, reject) => {
            customerService.getCustomerById(id)
                .then(
                    user => {
                        dispatch(success(user));
                        resolve(user);
                        businessService.getBusinessLocations(user.data.userprofileData[0].business_id)
                            .then(
                                result => {
                                    console.log('got business locations', result)
                                    dispatch(locationSuccess(result));
                                },
                                error => {
                                    dispatch(failure(error.toString()));
                                }
                            );
                    },
                    error => dispatch(failure(error.toString()))
                );
            console.log("innnnnnnnnn");
        });
    };


    function request() { return { type: customerConstants.GET_PROFILE_REQUEST } }
    function success(customer) { return { type: customerConstants.GET_PROFILE_SUCCESS, customer } }
    function locationSuccess(businessLocation) { return { type: businessConstants.GETLOCATION_SUCCESS, businessLocation } }
    function failure(error) { return { type: customerConstants.GET_PROFILE_FAILURE, error } }
}

//Update Selective Customer from DB
function updateCustomerById(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                result => {
                    userService.updateProfile(user)
                        .then(
                            result => {
                                dispatch(success());
                                history.push('/customer');
                                dispatch(alertActions.success('Updated customer profile successfully'));
                            },
                            error => {
                                dispatch(failure(error.toString()));
                                dispatch(alertActions.error(error.toString()));
                            }
                        );
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: customerConstants.UPDATE_REQUEST, user } }
    function success(result) { return { type: customerConstants.UPDATE_SUCCESS, result } }
    function failure(error) { return { type: customerConstants.UPDATE_FAILURE, error } }
}

function updateProfilePic(user, formData) {
    return dispatch => {
        dispatch(request());

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

    function request() { return { type: customerConstants.GET_PROFILE_REQUEST } }
    function success(customer) { return { type: customerConstants.GET_PROFILE_SUCCESS, customer } }
    function failure(error) { return { type: customerConstants.GET_PROFILE_FAILURE, error } }

}


function addPhoto(formData, id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            customerService.addPhoto(formData, id)
                .then(
                    result => {
                        resolve(result);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    };
}

function editPhoto(formData, id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            customerService.editPhoto(formData, id)
                .then(
                    result => {
                        resolve(result);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    };
}

function getPhotos(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            customerService.getPhotos(id)
                .then(
                    result => {
                        resolve(result);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    };
}

