import { deviceConstants } from '../_constants';
import { deviceService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const deviceActions = {
    getAllDevices,
    addNewDevice,
    deleteDevice,
    updateDevice,
    activate,
    getDeviceById
};


function getAllDevices(businessOwnerId) {
    return dispatch => {
        dispatch(request());
        deviceService.getAllDevices(businessOwnerId)
            .then(
                visitor => dispatch(success(visitor)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: deviceConstants.GETALL_REQUEST } }
    function success(visitor) { return { type: deviceConstants.GETALL_SUCCESS, visitor } }
    function failure(error) { return { type: deviceConstants.GETALL_FAILURE, error } }
}


function addNewDevice(user) {
    return dispatch => {
        dispatch(request(user));
        return new Promise((resolve, reject) => {
            deviceService.createDevice(user)
                .then(
                    user => {
                        dispatch(success());
                        dispatch(alertActions.success('New device added successfully'));
                        return resolve(true);
                    },
                    error => {
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                        return reject(false);
                    }
                );
        });
    };

    function request(user) { return { type: deviceConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: deviceConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: deviceConstants.REGISTER_FAILURE, error } }
}

function getDeviceById(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            deviceService.getDeviceById(id)
                .then(
                    user => {
                        resolve(user);
                    },
                    error => {
                        reject(err)
                    }
                );
        });
    };
}


function deleteDevice(id) {
    return dispatch => {
        dispatch(request(id));
        deviceService.deleteDevice(id)
            .then(
                //user => dispatch(success(id)),
                user => {
                    dispatch(success(id));
                    history.push('/devices');
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: deviceConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: deviceConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: deviceConstants.DELETE_FAILURE, id, error } }
}

function updateDevice(data) {
    return dispatch => {
        dispatch(request(data));
        deviceService.updateDevice(data)
            .then(
                user => {
                    dispatch(alertActions.success('Updated Successfully'));
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: deviceConstants.UPDATE_SUCCESS, id } }
    function success(id) { return { type: deviceConstants.UPDATE_SUCCESS, id } }
    function failure(id, error) { return { type: deviceConstants.UPDATE_SUCCESS, id, error } }
}

function activate(device) {
    return dispatch => {
        deviceService.updateDevice(device)
            .then(
                customer => dispatch(success(device)),
                error => dispatch(failure(device, error.toString()))
            );
    };

    function request(device) { return { type: deviceConstants.ACTIVATE_REQUEST, device } }
    function success(device) { return { type: deviceConstants.ACTIVATE_SUCCESS, device } }
    function failure(device, error) { return { type: deviceConstants.ACTIVATE_FAILURE, device, error } }
}