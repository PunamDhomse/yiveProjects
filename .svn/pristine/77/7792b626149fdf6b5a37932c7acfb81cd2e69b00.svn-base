import { commonConstants } from '../_constants';
const INITIAL_STATE = { countries: {}, regions: [] }

export function common(state = INITIAL_STATE, action) {
  //console.log('this is action type', action.type)
  switch (action.type) {
    case commonConstants.GETALL_COUNTRIES:
      return {
        ...state,
        loading: true
      };
    case commonConstants.MAIN_LOGO:
      return {
        ...state,
        logo: action.logo
      };
    case commonConstants.GETALL_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.countries.data
      };
    case commonConstants.GETALL_COUNTRIES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case commonConstants.GETALL_REGIONS:
      return {
        ...state,
        loading: true
      };
    case commonConstants.GETALL_REGIONS_SUCCESS:
      return {
        ...state,
        regions: action.regions.data[0].regions
      };
    case commonConstants.GETALL_LOCATION_REGIONS_SUCCESS:
      const locationIndex = action.locationIndex;
      const responseRegions = state.regions;
      responseRegions[locationIndex] = action.regions.data[0].regions;
      return {
        ...state,
        regions: responseRegions
      };
    case commonConstants.GETALL_REGIONS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}