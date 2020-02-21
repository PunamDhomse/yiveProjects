import config from 'config';
import { authHeader } from '../_helpers';

export const dashboardService = {
    getCountries,
    getRegions,
    getAllCustomer,
    getAllBusiness,
    getAllVisitor,
    getAllBusinessesVisitor,
    getCustomersList,
    getVisitorsList,
    getLocationCustomersList,
    getLocationVisitorsList,
    getLocationCustomerCount,
    getLocationVisitorCount,
};


function getCountries() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached");

    return fetch(`${config.apiUrl}/country/list`, requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getRegions(countryId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached");

    return fetch(`${config.apiUrl}/country/regions/${countryId}`, requestOptions).then(handleResponse);
}

function getAllCustomer(startDateFilter, endDateFilter, UserId){
    const requestOptions = {
            method: 'GET',
            headers: authHeader()
    };
    console.log("reached customer SERVICE");

    if(UserId){
        console.log("CUSTOMER BY ID");
        return fetch(`${config.apiUrl}/customer/count/byuser/${UserId}/${startDateFilter}/${endDateFilter}`, requestOptions).then(handleResponse);
   }else{
    console.log("CUSTOMER BY ADMIN");
    return fetch(`${config.apiUrl}/customer/count/all/${startDateFilter}/${endDateFilter}`, requestOptions).then(handleResponse);
   }
    
}

function getCustomersList(startDateFilter, endDateFilter, getby, byId){
     const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached");

    if(byId != '') {
        return fetch(`${config.apiUrl}/customer/list/${startDateFilter}/${endDateFilter}/${getby}/${byId}/`, requestOptions).then(handleResponse);
    } else {
        return fetch(`${config.apiUrl}/customer/list/${startDateFilter}/${endDateFilter}/all/`, requestOptions).then(handleResponse);
    }
}

function getVisitorsList(startDateFilter, endDateFilter, businessOwnerId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached in Vistor listing");
    if(businessOwnerId !== 'all'){
         return fetch(`${config.apiUrl}/visitor/list/${startDateFilter}/${endDateFilter}/${businessOwnerId}`, requestOptions).then(handleResponse);
    }else{
        return fetch(`${config.apiUrl}/visitor/visitorList/${startDateFilter}/${endDateFilter}`, requestOptions).then(handleResponse);
    }
}

function getAllBusiness(startDateFilter, endDateFilter, UserId){
    const requestOptions = {
            method: 'GET',
            headers: authHeader()
    };
    console.log("reached business SERVICE");

    if(UserId){
        console.log("Business BY ID");
        return fetch(`${config.apiUrl}/business/count/byuser/${UserId}/${startDateFilter}/${endDateFilter}`, requestOptions).then(handleResponse);
   }else{
    console.log("Business BY ADMIN");
    return fetch(`${config.apiUrl}/business/count/all/${startDateFilter}/${endDateFilter}`, requestOptions).then(handleResponse);
   }
    
}

function getAllBusinessesVisitor(UserId, startDate, endDate){
    const requestOptions = {
            method: 'GET',
            headers: authHeader()
    };
    console.log("reached all business VISITOR");
    // const startDatee = ISODate(startDate);
    // const endDatee   = startDate(endDate);
    // console.log("STARTING AND ENDING", startDatee . endDatee);
    // const startDatee = '2019-11-27'
    // const endDatee   = '2019-11-30';
    if(UserId){
        console.log("Business BY ID");
        return fetch(`${config.apiUrl}/visitor/count/byuser/${UserId}`, requestOptions).then(handleResponse);
    } else {
        console.log("All Business visitor BY ID");
        // return fetch(`${config.apiUrl}/visitor/businesses/countbydate/all/${startDate}/${endDate}`, requestOptions).then(handleResponse);
        return fetch(`${config.apiUrl}/visitor/businesses/countbydate/all/${startDate}/${endDate}`, requestOptions).then(handleResponse);
   }
        
}

function getAllVisitor(startDateFilter, endDateFilter, UserId){
    const requestOptions = {
            method: 'GET',
            headers: authHeader()
    };
    console.log("reached visitor SERVICE");

    if(UserId){
        console.log("Visitor BY ID");
        return fetch(`${config.apiUrl}/visitor/count/byuser/${UserId}/${startDateFilter}/${endDateFilter}`, requestOptions).then(handleResponse);
   }else{
    console.log("Visitor BY ADMIN");
    return fetch(`${config.apiUrl}/visitor/count/all/${startDateFilter}/${endDateFilter}`, requestOptions).then(handleResponse);
   }
    
}

function getLocationVisitorCount(startDateFilter, endDateFilter, locationId, businessId){
    const requestOptions = {
            method: 'GET',
            headers: authHeader()
    };
    console.log("reached visitor SERVICE");
    
    return fetch(`${config.apiUrl}/visitor/count/bylocation/${locationId}/${businessId}/${startDateFilter}/${endDateFilter}`, requestOptions).then(handleResponse);
}


function getLocationCustomerCount(startDateFilter, endDateFilter, locationId, businessId) {
    const requestOptions = {
            method: 'GET',
            headers: authHeader()
    };
    console.log("reached customer SERVICE");
    
    return fetch(`${config.apiUrl}/customer/count/bylocation/${locationId}/${businessId}/${startDateFilter}/${endDateFilter}`, requestOptions).then(handleResponse);
}

function getLocationCustomersList(startDateFilter, endDateFilter, getby, locationId, businessId){
     const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached");

    return fetch(`${config.apiUrl}/customer/list/${startDateFilter}/${endDateFilter}/${getby}/${locationId}/${businessId}`, requestOptions).then(handleResponse);
}

function getLocationVisitorsList(startDateFilter, endDateFilter, locationId, businessId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("reached in Vistor listing");
    
    return fetch(`${config.apiUrl}/visitor/list/${startDateFilter}/${endDateFilter}/${locationId}/${businessId}`, requestOptions).then(handleResponse);
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