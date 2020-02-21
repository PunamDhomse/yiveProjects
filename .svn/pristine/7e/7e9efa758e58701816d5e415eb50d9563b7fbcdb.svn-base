import { commonConstants } from '../_constants';
import { commonService } from '../_services';

export const commonActions = {
    getCountries,
    getRegions,
    getRegionsForLocations,
    returnCountries,
    returnRegions,
    setLogo
};

// Get All Countries from db
function getCountries() {
    return dispatch => {
        dispatch(request());
        commonService.getCountries()
            .then(
                countries => dispatch(success(countries)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: commonConstants.GETALL_COUNTRIES } }
    function success(countries) { return { type: commonConstants.GETALL_COUNTRIES_SUCCESS, countries } }
    function failure(error) { return { type: commonConstants.GETALL_COUNTRIES_FAILURE, error } }
}

function setLogo(logo) {
    return dispatch => {
        dispatch(success(logo))
    };

    function success(logo) { return { type: commonConstants.MAIN_LOGO, logo } }
}

function returnCountries() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            commonService.getCountries()
                .then(
                    countries => resolve(countries),
                );
        });
    }
}

function returnRegions(countryId) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            commonService.getRegions(countryId)
                .then(
                    regions => resolve(regions)
                );
        });
    }
}

// Get All Countries from db
function getRegions(countryId) {
    return dispatch => {
        dispatch(request());
        commonService.getRegions(countryId)
            .then(
                regions => dispatch(success(regions)),
                error => dispatch(failure(error.toString()))
            );
        //console.log("regions==========,", regions);
    };
    function request() { return { type: commonConstants.GETALL_REGIONS } }
    function success(regions, locationIndex) { return { type: commonConstants.GETALL_REGIONS_SUCCESS, regions } }
    function failure(error) { return { type: commonConstants.GETALL_REGIONS_FAILURE, error } }

}
// Get All Countries from db
function getRegionsForLocations(countryId, locationIndex) {
    return dispatch => {
        dispatch(request());
        commonService.getRegions(countryId)
            .then(
                regions => dispatch(success(regions, locationIndex)),
                error => dispatch(failure(error.toString()))
            );
        //console.log("regions==========,", regions);
    };
    function request() { return { type: commonConstants.GETALL_REGIONS } }
    function success(regions, locationIndex) { return { type: commonConstants.GETALL_LOCATION_REGIONS_SUCCESS, regions, locationIndex } }
    function failure(error) { return { type: commonConstants.GETALL_REGIONS_FAILURE, error } }
}