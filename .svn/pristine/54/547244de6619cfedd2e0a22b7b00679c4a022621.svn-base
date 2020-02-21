import { businessConstants, visitorConstants } from '../_constants';
import { businessService, visitorService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const visitorActions = {
    getAllVisitors,
    addNewVisitor,
    deleteVisitor,
    getVisitorsForLocation,
    getVisitorByCustId
};



// Get All Users from DB
function getAllVisitors(businessOwnerId) {
    return dispatch => {
        dispatch(request());
        visitorService.getAllVisitors(businessOwnerId)
            .then(
                visitor => dispatch(success(visitor)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: visitorConstants.GETALL_REQUEST } }
    function success(visitor) { return { type: visitorConstants.GETALL_SUCCESS, visitor } }
    function failure(error) { return { type: visitorConstants.GETALL_FAILURE, error } }
}

function getVisitorsForLocation(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            visitorService.getVisitorsForLocation(data)
                .then(
                    visitor => resolve(visitor),
                );
        });
    };
}

function getVisitorByCustId(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            visitorService.getVisitorByCustId(id)
                .then(
                    visitor => resolve(visitor),
                );
        });
    };
}

function addNewVisitor(user) {
    return dispatch => {
        dispatch(request(user));
        return new Promise((resolve, reject) => {
            visitorService.addNewVisitor(user)
                .then(
                    user => {
                        dispatch(success());
                        dispatch(alertActions.success('New visitor added successfully'));
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

    function request(user) { return { type: visitorConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: visitorConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: visitorConstants.REGISTER_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteVisitor(id) {
    return dispatch => {
        dispatch(request(id));
        visitorService.deleteVisitor(id)
            .then(
                //user => dispatch(success(id)),
                user => {
                    dispatch(success(id));
                    history.push('/visitor');
                    dispatch(alertActions.success('This visitor deleted permanently!!!'));
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: visitorConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: visitorConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: visitorConstants.DELETE_FAILURE, id, error } }
}