import { dashboardConstants } from '../_constants';
import { dashboardService } from '../_services';

export const dashboardActions = {
    getCounts,
    getCustomerCounts,
    getVisitorCounts,
    getBusinessCounts,
    getAllBusinessesVisitor,
    getCustomers,
    getVisitors,
    getLocationCustomerCounts,
    getLocationVisitorCounts,
    getLocationCustomers,
    getLocationVisitors,
};

// Get All Countries from db
function getCounts() {
    return dispatch => {
        dispatch(request());
        console.log("reaching to all customers");
        dashboardService.getCountries()
            .then(
                countries => dispatch(success(countries)),
                error => dispatch(failure(error.toString()))
            );
            
    };

    function request() { return { type: dashboardConstants.GETALL_COUNTS} }
    function success(countries) { return { type: dashboardConstants.GETALL_COUNTS_SUCCESS, countries } }
    function failure(error) { return { type: dashboardConstants.GETALL_COUNTS_FAILURE, error } }
}

// Get All Customer Countries from db
function getCustomerCounts(startDateFilter, endDateFilter, UserId = '') {
    return dispatch => {
        dispatch(request());
        console.log("reaching to all customers");
        dashboardService.getAllCustomer(startDateFilter, endDateFilter, UserId)
            .then(
                customers => dispatch(success(customers)),
                error => dispatch(failure(error.toString()))
            );
            
    };

    function request() { return { type: dashboardConstants.GETALLCUSTOMER_COUNTS_REQUEST} }
    function success(customers) { return { type: dashboardConstants.GETALLCUSTOMER_COUNTS_SUCCESS, customers } }
    function failure(error) { return { type: dashboardConstants.GETALLCUSTOMER_COUNTS_FAILURE, error } }
}


// Get All Customer Countries from db
function getLocationCustomerCounts(startDateFilter, endDateFilter, locationId, businessId) {
    return dispatch => {
        dispatch(request());
        console.log("reaching to all customers");
        dashboardService.getLocationCustomerCount(startDateFilter, endDateFilter, locationId, businessId)
            .then(
                customers => dispatch(success(customers)),
                error => dispatch(failure(error.toString()))
            );
            
    };

    function request() { return { type: dashboardConstants.GETALLCUSTOMER_COUNTS_REQUEST} }
    function success(customers) { return { type: dashboardConstants.GETALLCUSTOMER_COUNTS_SUCCESS, customers } }
    function failure(error) { return { type: dashboardConstants.GETALLCUSTOMER_COUNTS_FAILURE, error } }
}


// Get All Customer Countries from db
function getBusinessCounts(startDateFilter, endDateFilter, UserId = '') {
    return dispatch => {
        dispatch(request());
        console.log("reaching to all customers");
        dashboardService.getAllBusiness(startDateFilter, endDateFilter, UserId)
            .then(
                business => dispatch(success(business)),
                error => dispatch(failure(error.toString()))
            );
            
    };

    function request() { return { type: dashboardConstants.GETALLBUSINESS_COUNTS_REQUEST} }
    function success(business) { return { type: dashboardConstants.GETALLBUSINESS_COUNTS_SUCCESS, business } }
    function failure(error) { return { type: dashboardConstants.GETALLBUSINESS_COUNTS_FAILURE, error } }
}

// Get All Business Visitor from db
function getAllBusinessesVisitor(UserId = '', startDate, EndDate) {
    console.log("I am in in getAllBusinessesVisitor");
    console.log(UserId, startDate, EndDate);
    return dispatch => {
        dispatch(request());
        console.log("reaching to all customers");
        dashboardService.getAllBusinessesVisitor(UserId, startDate, EndDate)
            .then(
                business => dispatch(success(business)),
                error => dispatch(failure(error.toString()))
            );
            
    };

    function request() { return { type: dashboardConstants.GETALLBUSINESS_COUNTS_REQUEST} }
    function success(business) { return { type: dashboardConstants.GETALLBUSINESS_COUNTS_SUCCESS, business } }
    function failure(error) { return { type: dashboardConstants.GETALLBUSINESS_COUNTS_FAILURE, error } }
}

// Get All Customer Countries from db
function getVisitorCounts(startDateFilter, endDateFilter, UserId = '') {
    return dispatch => {
        dispatch(request());
        console.log("reaching to all customers");
        dashboardService.getAllVisitor(startDateFilter, endDateFilter, UserId)
            .then(
                visitor => dispatch(success(visitor)),
                error => dispatch(failure(error.toString()))
            );
            
    };

    function request() { return { type: dashboardConstants.GETALLVISITOR_COUNTS_REQUEST} }
    function success(visitor) { return { type: dashboardConstants.GETALLVISITOR_COUNTS_SUCCESS, visitor } }
    function failure(error) { return { type: dashboardConstants.GETALLVISITOR_COUNTS_FAILURE, error } }
}

// Get All Customer List from db
function getCustomers(startDateFilter, endDateFilter, getby = 'all', byId = '') {
    return dispatch => {
        dispatch(request());
        console.log("reaching to all customers");
        dashboardService.getCustomersList(startDateFilter, endDateFilter, getby, byId)
            .then(
                customers => dispatch(success(customers)),
                error => dispatch(failure(error.toString()))
            );
            
    };

    function request() { return { type: dashboardConstants.GETALLCUSTOMER_REQUEST} }
    function success(customers) { return { type: dashboardConstants.GETALLCUSTOMER_SUCCESS, customers } }
    function failure(error) { return { type: dashboardConstants.GETALLCUSTOMER_FAILURE, error } }
}

// Get All Users from DB
function getVisitors(startDateFilter, endDateFilter, businessOwnerId) {
    return dispatch => {
        dispatch(request());
        console.log("reaching");
        dashboardService.getVisitorsList(startDateFilter, endDateFilter, businessOwnerId)
            .then(
                visitor => dispatch(success(visitor)),
                error => dispatch(failure(error.toString()))
            );
    };
    // console.log("reaching SUCCESS");
    function request() { return { type: dashboardConstants.GETALLVISITOR_REQUEST } }
    function success(visitor) { return { type: dashboardConstants.GETALLVISITOR_SUCCESS, visitor } }
    function failure(error) { return { type: dashboardConstants.GETALLVISITOR_FAILURE, error } }
}

// Get All Customer Countries from db
function getLocationVisitorCounts(startDateFilter, endDateFilter, locationId, businessId) {
    return dispatch => {
        dispatch(request());
        console.log("reaching to all customers");
        dashboardService.getLocationVisitorCount(startDateFilter, endDateFilter, locationId, businessId)
            .then(
                visitor => dispatch(success(visitor)),
                error => dispatch(failure(error.toString()))
            );
            
    };

    function request() { return { type: dashboardConstants.GETALLVISITOR_COUNTS_REQUEST} }
    function success(visitor) { return { type: dashboardConstants.GETALLVISITOR_COUNTS_SUCCESS, visitor } }
    function failure(error) { return { type: dashboardConstants.GETALLVISITOR_COUNTS_FAILURE, error } }
}

// Get All Customer List from db
function getLocationCustomers(startDateFilter, endDateFilter, getby, locationId, businessId) {
    return dispatch => {
        dispatch(request());
        console.log("reaching to all customers");
        dashboardService.getLocationCustomersList(startDateFilter, endDateFilter, getby, locationId, businessId)
            .then(
                customers => dispatch(success(customers)),
                error => dispatch(failure(error.toString()))
            );
            
    };

    function request() { return { type: dashboardConstants.GETALLCUSTOMER_REQUEST} }
    function success(customers) { return { type: dashboardConstants.GETALLCUSTOMER_SUCCESS, customers } }
    function failure(error) { return { type: dashboardConstants.GETALLCUSTOMER_FAILURE, error } }
}

// Get All Users from DB
function getLocationVisitors(startDateFilter, endDateFilter, locationId, businessId) {
    return dispatch => {
        dispatch(request());
        console.log("reaching");
        dashboardService.getLocationVisitorsList(startDateFilter, endDateFilter, locationId, businessId)
            .then(
                visitor => dispatch(success(visitor)),
                error => dispatch(failure(error.toString()))
            );
    };
    // console.log("reaching SUCCESS");
    function request() { return { type: dashboardConstants.GETALLVISITOR_REQUEST } }
    function success(visitor) { return { type: dashboardConstants.GETALLVISITOR_SUCCESS, visitor } }
    function failure(error) { return { type: dashboardConstants.GETALLVISITOR_FAILURE, error } }
}
