import { businessmngConstants, businessConstants } from '../_constants';
import { businessMngService, userService, businessService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const businessMngActions = {
    newCustomer,
    getAllCustomers,
    deleteCustomer,
    getCustomerById,
    activate,
    updateCustomerById,
    updateProfilePic,
    getMultipleLocs
};


function newCustomer(user, file) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                result => {
                    console.log('------------------new user added, profile is in uplaoding stage', result);
                    user.user_id = result.data._id; // Push the object
                    console.log('this is called', user);
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
                                                dispatch(alertActions.success('New manager added successfully'));
                                            },
                                            error => {
                                                dispatch(failure(error.toString()));
                                                dispatch(alertActions.error(error.toString()));
                                            }
                                        );
                                } else {
                                    dispatch(success());
                                    dispatch(alertActions.success('New manager added successfully'));
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
    };


    function request(user) { return { type: businessmngConstants.REGISTER_REQUEST1, user } }
    function success(user) { return { type: businessmngConstants.REGISTER_SUCCESS1, user } }
    function failure(error) { return { type: businessmngConstants.REGISTER_FAILURE1, error } }
}


// Get All Users from DB
function getAllCustomers(getby = 'all', byId = '', body) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());
            console.log("reaching to all customers");
            businessMngService.getAllCustomers(getby, byId, body)
                .then(
                    customer => {
                        dispatch(success(customer));
                        resolve(customer);
                    },
                    error => dispatch(failure(error.toString()))
                );
        });
    };

    function request() { return { type: businessmngConstants.GETALL_REQUEST1 } }
    function success(customer) { return { type: businessmngConstants.GETALL_SUCCESS1, customer } }
    function failure(error) { return { type: businessmngConstants.GETALL_FAILURE1, error } }
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

    function request(id) { return { type: businessmngConstants.DELETE_REQUEST1, id } }
    function success(id) { return { type: businessmngConstants.DELETE_SUCCESS1, id } }
    function failure(id, error) { return { type: businessmngConstants.DELETE_FAILURE1, id, error } }
}


function getMultipleLocs(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            businessMngService.getMultipleLocs(id)
                .then(
                    locs => resolve(locs)
                );
        });
    };
}


function activate(customer) {
    return dispatch => {
        // dispatch(request(customer));
        userService.update(customer)
            .then(
                customer => dispatch(success(customer.data)),
                error => dispatch(failure(customer, error.toString()))
            );
    };

    function request(customer) { return { type: businessmngConstants.ACTIVATE_REQUEST1, customer } }
    function success(customer) { return { type: businessmngConstants.ACTIVATE_SUCCESS1, customer } }
    function failure(customer, error) { return { type: businessmngConstants.ACTIVATE_FAILURE1, customer, error } }
}


// Get Selective Customer from DB
function getCustomerById(id) {
    return dispatch => {
        dispatch(request());
        return new Promise((resolve, reject) => {
            businessMngService.getCustomerById(id)
                .then(
                    user => {
                        dispatch(success(user));
                        resolve(user);
                        businessService.getBusinessLocations(user.data.userprofileData[0].business_id)
                            .then(
                                result => {
                                    console.log('got business locations', result)
                                    // dispatch(locationSuccess(result));
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


    function request() { return { type: businessmngConstants.GET_PROFILE_REQUEST1 } }
    function success(customer) { return { type: businessmngConstants.GET_PROFILE_SUCCESS1, customer } }
    // function locationSuccess(businessLocation) { return { type: businessmngConstants.GETLOCATION_SUCCESS1, businessLocation } }
    function failure(error) { return { type: businessmngConstants.GET_PROFILE_FAILURE1, error } }
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
                                history.push('/business-manager');
                                dispatch(alertActions.success('Updated manager profile successfully'));
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

    function request(user) { return { type: businessmngConstants.UPDATE_REQUEST1, user } }
    function success(result) { return { type: businessmngConstants.UPDATE_SUCCESS1, result } }
    function failure(error) { return { type: businessmngConstants.UPDATE_FAILURE1, error } }
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

    function request() { return { type: businessmngConstants.GET_PROFILE_REQUEST1 } }
    function success(customer) { return { type: businessmngConstants.GET_PROFILE_SUCCESS1, customer } }
    function failure(error) { return { type: businessmngConstants.GET_PROFILE_FAILURE1, error } }

}

