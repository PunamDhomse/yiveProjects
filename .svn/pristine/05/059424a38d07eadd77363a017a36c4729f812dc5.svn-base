import { locationmanagerConstants } from '../_constants';

export function locationManager(state = {}, action) {
  //console.log('this is action type', action.type)
  switch (action.type) {
    case locationmanagerConstants.REGISTER_REQUEST:
      return { adding: true };
    case locationmanagerConstants.REGISTER_SUCCESS:
      return {};
    case locationmanagerConstants.REGISTER_FAILURE:
      return {};
    case locationmanagerConstants.GET_REQUEST:
        return {
          loading: true
        };

    case locationmanagerConstants.GET_SUCCESS:
          return {
            locationManagerInfo: action.locationManager.data
    };
    case locationmanagerConstants.GET_FAILURE:
      return { 
        error: action.error
    };
    case locationmanagerConstants.GETLOCATION_REQUEST:
        return {
          loading: true
        };
    case locationmanagerConstants.GETLOCATION_SUCCESS:
          return {
            locationManagerLocation: action.locationManagerLocation.data
    };
    case locationmanagerConstants.GETLOCATION_FAILURE:
      return { 
        error: action.error
    };
    case locationmanagerConstants.GETALL_SUCCESS:
      return {
          items: action.locationManager.data
        };
    case locationmanagerConstants.GETALL_REQUEST:
      return {
            loading: true
        };
    case locationmanagerConstants.GETALL_FAILURE:
      return { 
              error: action.error
        };
    case locationmanagerConstants.UPDATE_REQUEST:
          return { updating: true };
    case locationmanagerConstants.UPDATE_SUCCESS:
          return {};
    case locationmanagerConstants.UPDATE_FAILURE:
          return {};
    case locationmanagerConstants.GET_PROFILE_REQUEST:
        return {
            loading: true
    };
    case locationmanagerConstants.GET_PROFILE_SUCCESS:
      return {
          locationManagerprofile: action.locationManager.data
      };
    case locationmanagerConstants.GET_PROFILE_FAILURE:
      return { 
            error: action.error
      };
    case locationmanagerConstants.DELETE_REQUEST:
          // add 'deleting:true' property to locationManager being deleted
          return {
            ...state,
            items: state.items.map(locationManager =>
              locationManager.id === action.id
                ? { ...locationManager, deleting: true }
                : locationManager
            )
          };
        case locationmanagerConstants.DELETE_SUCCESS:
          // inactivate locationManager from state
          return {
            items: state.items.map(locationManager => {var tempBusiness = Object.assign({}, locationManager); (tempBusiness._id == action.id) ? tempBusiness.status = false : ''; return tempBusiness;})
          };
        case locationmanagerConstants.DELETE_FAILURE:
          // remove 'deleting:true' property and add 'deleteError:[error]' property to locationManager 
          return {
            ...state,
            items: state.items.map(locationManager => {
              if (locationManager.id === action.id) {
                // make copy of locationManager without 'deleting:true' property
                const { deleting, ...locationManagerCopy } = locationManager;
                // return copy of locationManager with 'deleteError:[error]' property
                return { ...locationManagerCopy, deleteError: action.error };
              }
    
              return locationManager;
            })
          };
          case locationmanagerConstants.ACTIVATE_REQUEST:
            // add 'deleting:true' property to locationManager being deleted
            return {
              ...state,
              items: state.items.map(locationManager =>
                locationManager.id === action.id
                  ? { ...locationManager, activating: true }
                  : locationManager
              )
            };
          case locationmanagerConstants.ACTIVATE_SUCCESS:
            // activate locationManager from state
            const actionlocationManager = action.locationManager;
            return {
              items: state.items.map(locationManager => {var templocationManager = Object.assign({}, locationManager); (templocationManager._id == actionlocationManager._id) ? templocationManager.status = true : ''; return templocationManager;})
            };
          case locationmanagerConstants.ACTIVATE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to locationManager 
            return {
              ...state,
              items: state.items.map(locationManager => {
                if (locationManager.id === action.id) {
                  // make copy of locationManager without 'deleting:true' property
                  const { activating, ...locationManagerCopy } = locationManager;
                  // return copy of locationManager with 'deleteError:[error]' property
                  return { ...locationManagerCopy, activateError: action.error };
                }
      
                return locationManager;
              })
            };
    default:
      return state
  }
}