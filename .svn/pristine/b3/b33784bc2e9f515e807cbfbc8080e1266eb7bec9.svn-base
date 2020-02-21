
import { visitorConstants } from '../_constants';
//const INITIAL_STATE = {businessInfo:{}, businessLocation:{}, adding:false, loading:false, error:{}, items:{}, updating:false}
export function visitor(state = {}, action) {
  //console.log('this is action type', action.type)
  switch (action.type) {
    case visitorConstants.REGISTER_REQUEST:
      return { ...state, adding: true };
    case visitorConstants.REGISTER_SUCCESS:
      return {};
    case visitorConstants.REGISTER_FAILURE:
      return {};
    case visitorConstants.GET_REQUEST:
        return {
          //...state, 
          loading: true
        };
    case visitorConstants.GET_SUCCESS:
          return {
            businessInfo: action.business.data
    };
    case visitorConstants.GET_FAILURE:
      return { 
        //...state, 
        error: action.error
    };
    case visitorConstants.GETLOCATION_REQUEST:
        return {
          //...state, 
          loading: true
        };
    case visitorConstants.GETLOCATION_SUCCESS:
          return {
            //...state, 
            businessLocation: action.businessLocation.data
    };
    case visitorConstants.GETLOCATION_FAILURE:
      return { 
        //...state, 
        error: action.error
    };
    case visitorConstants.GETALL_SUCCESS:
      return {
        //...state, 
          items: action.visitor.data
        };
    case visitorConstants.GETALL_REQUEST:
      return {
        //...state, 
            loading: true
        };
    case visitorConstants.GETALL_FAILURE:
      return { 
        //...state, 
              error: action.error
        };
    case visitorConstants.UPDATE_REQUEST:
      return { //...state, 
        updating: true };
    case visitorConstants.UPDATE_SUCCESS:
          return {};
    case visitorConstants.UPDATE_FAILURE:
          return {};
    case visitorConstants.DELETE_REQUEST:
          // add 'deleting:true' property to business being deleted
          return {
            //...state,
            items: state.items.map(business =>
              business.id === action.id
                ? { ...business, deleting: true }
                : business
            )
          };
        case visitorConstants.DELETE_SUCCESS:
          // inactivate business from state
          return {
            ...state
          };
        case visitorConstants.DELETE_FAILURE: 
          // remove 'deleting:true' property and add 'deleteError:[error]' property to business 
          return {
            //...state,
            items: state.items.map(business => {
              if (business.id === action.id) {
                // make copy of business without 'deleting:true' property
                const { deleting, ...businessCopy } = business;
                // return copy of business with 'deleteError:[error]' property
                return { ...businessCopy, deleteError: action.error };
              }
    
              return business;
            })
          };
          case visitorConstants.ACTIVATE_REQUEST:
            // add 'deleting:true' property to business being deleted
            return {
              //...state,
              items: state.items.map(business =>
                business.id === action.id
                  ? { ...business, activating: true }
                  : business
              )
            };
          case visitorConstants.ACTIVATE_SUCCESS:
            // activate business from state
            const actionBusiness = action.business;
            return {
              //...state, 
              items: state.items.map(business => {var tempBusiness = Object.assign({}, business); (tempBusiness._id == actionBusiness._id) ? tempBusiness.status = 1 : ''; return tempBusiness;})
            };
          case visitorConstants.ACTIVATE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to business 
            return {
              //...state,
              items: state.items.map(business => {
                if (business.id === action.id) {
                  // make copy of business without 'deleting:true' property
                  const { activating, ...businessCopy } = business;
                  // return copy of business with 'deleteError:[error]' property
                  return { ...businessCopy, activateError: action.error };
                }
      
                return business;
              })
            };
    default:
      return state
  }
}