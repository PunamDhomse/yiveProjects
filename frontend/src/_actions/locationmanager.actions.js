import { locationmanagerConstants, businessConstants } from '../_constants';
import { locationmanagerService, userService, businessService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const locationmanagerActions = {
    newLocationManager,
    getAllLocationManagers,
    deleteLocationManager,
    getLocationManagerById,
    activate,
    updateLocationManagerById,
    updateProfilePic
};


function newLocationManager(user,file) {
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
                        result=>{
                            if(file !== null){
                                let formData = new FormData();
                                formData.append('file', file);
                                userService.updateProfilePic(user.user_id, formData)
                                .then(
                                    result=>{
                                        dispatch(success());
                                        dispatch(alertActions.success('New Location Manger added successfully'));
                                    },
                                    error => {
                                        dispatch(failure(error.toString()));
                                        dispatch(alertActions.error(error.toString()));
                                    }
                                );
                            }else {
                                dispatch(success());
                                dispatch(alertActions.success('New Location Manager added successfully'));
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


    function request(user) { return { type: locationmanagerConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: locationmanagerConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: locationmanagerConstants.REGISTER_FAILURE, error } }
}


// Get All location Managers from DB
function getAllLocationManagers(getby = 'all', byId = '', body) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());
            console.log("reaching to all location Managers");
            locationmanagerService.getAllLocationManagers(getby, byId, body)
                .then(
                    locationManager => {                        
                        dispatch(success(locationManager));
                        resolve(locationManager);
                    },
                    error => dispatch(failure(error.toString()))
                );
        });
    };

    function request() { return { type: locationmanagerConstants.GETALL_REQUEST } }
    function success(locationManager) { return { type: locationmanagerConstants.GETALL_SUCCESS, locationManager } }
    function failure(error) { return { type: locationmanagerConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteLocationManager(id) {
    return dispatch => {
        dispatch(request(id));
        userService.delete(id)
            .then(
                locationManager => {
                    dispatch(success(id));
                    history.push('/locationMgr');
                    // dispatch(alertActions.success('Location Manager status updated as inactive'));

                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: locationmanagerConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: locationmanagerConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: locationmanagerConstants.DELETE_FAILURE, id, error } }
}


function activate(locationManager) {
    return dispatch => {
        dispatch(request(locationManager));
        userService.update(locationManager)
            .then(
                locationManager => {
                    dispatch(success(locationManager.data));
                    history.push('/locationMgr');
                    // dispatch(alertActions.success('Location Manager status updated as active'));

                },
                error => dispatch(failure(locationManager, error.toString()))
            );
    };

    function request(locationManager) { return { type: locationmanagerConstants.ACTIVATE_REQUEST, locationManager } }
    function success(locationManager) { return { type: locationmanagerConstants.ACTIVATE_SUCCESS, locationManager } }
    function failure(locationManager, error) { return { type: locationmanagerConstants.ACTIVATE_FAILURE, locationManager, error } }
}


// Get Selective Location Manager from DB
function getLocationManagerById(id) {
    return dispatch => {
        dispatch(request());
        return new Promise((resolve, reject) => {
            locationmanagerService.getLocationManagerById(id)
                .then(
                    locationManager => {
                        dispatch(success(locationManager));
                        resolve(locationManager);
                        businessService.getBusinessLocations(locationManager.data.userprofileData[0].business_id)
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


    function request() { return { type: locationmanagerConstants.GET_PROFILE_REQUEST } }
    function success(locationManager) { return { type: locationmanagerConstants.GET_PROFILE_SUCCESS, locationManager } }
    function locationSuccess(businessLocation) { return { type: businessConstants.GETLOCATION_SUCCESS, businessLocation } }
    function failure(error) { return { type: locationmanagerConstants.GET_PROFILE_FAILURE, error } }
}

//Update Selective Location Manager from DB
function updateLocationManagerById(locationManager) {
    return dispatch => {
        dispatch(request(locationManager));

        userService.update(locationManager)
            .then(
                result => {
                    userService.updateProfile(locationManager)
                        .then(
                            result => {
                                dispatch(success());
                                history.push('/locationMgr');
                                dispatch(alertActions.success('Updated location manager profile successfully'));
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

    function request(locationManager) { return { type: locationmanagerConstants.UPDATE_REQUEST, locationManager } }
    function success(result) { return { type: locationmanagerConstants.UPDATE_SUCCESS, result } }
    function failure(error) { return { type: locationmanagerConstants.UPDATE_FAILURE, error } }
}

function updateProfilePic(locationManager, formData) {
    return dispatch => {
        dispatch(request());

        userService.updateProfilePic(locationManager, formData)
            .then(
                result => {
                    userService.getProfileById(locationManager)
                        .then(
                            locationManager => dispatch(success(locationManager)),
                            error => dispatch(failure(error.toString()))
                        );
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: locationmanagerConstants.GET_PROFILE_REQUEST } }
    function success(locationManager) { return { type: locationmanagerConstants.GET_PROFILE_SUCCESS, locationManager } }
    function failure(error) { return { type: locationmanagerConstants.GET_PROFILE_FAILURE, error } }

}

