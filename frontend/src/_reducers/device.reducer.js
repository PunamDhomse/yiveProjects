
import { deviceConstants } from '../_constants';
//const INITIAL_STATE = {businessInfo:{}, businessLocation:{}, adding:false, loading:false, error:{}, items:{}, updating:false}
export function device(state = {}, action) {
  //console.log('this is action type', action.type)
  switch (action.type) {
    case deviceConstants.REGISTER_REQUEST:
      return { ...state, adding: true };
    case deviceConstants.REGISTER_SUCCESS:
      return {};
    case deviceConstants.REGISTER_FAILURE:
      return {};
    case deviceConstants.GET_REQUEST:
        return {
          //...state, 
          loading: true
        };
    case deviceConstants.GET_SUCCESS:
          return {
            businessInfo: action.business.data
    };
    case deviceConstants.GET_FAILURE:
      return { 
        //...state, 
        error: action.error
    };
    case deviceConstants.GETLOCATION_REQUEST:
        return {
          //...state, 
          loading: true
        };
    case deviceConstants.GETLOCATION_SUCCESS:
          return {
            //...state, 
            businessLocation: action.businessLocation.data
    };
    case deviceConstants.GETLOCATION_FAILURE:
      return { 
        //...state, 
        error: action.error
    };
    case deviceConstants.GETALL_SUCCESS:
      return {
        //...state, 
          items: action.visitor.data
        };
    case deviceConstants.GETALL_REQUEST:
      return {
        //...state, 
            loading: true
        };
    case deviceConstants.GETALL_FAILURE:
      return { 
        //...state, 
              error: action.error
        };
    case deviceConstants.UPDATE_REQUEST:
      return { //...state, 
        updating: true };
    case deviceConstants.UPDATE_SUCCESS:
          return {};
    case deviceConstants.UPDATE_FAILURE:
          return {};
    case deviceConstants.DELETE_REQUEST:
          // add 'deleting:true' property to business being deleted
          return {
            //...state,
            items: state.items.map(business =>
              business.id === action.id
                ? { ...business, deleting: true }
                : business
            )
          };
        case deviceConstants.DELETE_SUCCESS:
          // inactivate business from state
          return {
            ...state, 
            items: state.items.map(business => {var tempBusiness = Object.assign({}, business); (tempBusiness._id == action.id) ? tempBusiness.status = false : ''; return tempBusiness;})
          };
        case deviceConstants.DELETE_FAILURE: 
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
          case deviceConstants.ACTIVATE_REQUEST:
            // add 'deleting:true' property to business being deleted
            return {
              //...state,
              items: state.items.map(business =>
                business.id === action.id
                  ? { ...business, activating: true }
                  : business
              )
            };
          case deviceConstants.ACTIVATE_SUCCESS:
            // activate business from state
            const actionBusiness = action.device;
            return {
              //...state, 
              items: state.items.map(business => { (business._id == actionBusiness._id) ? business.status = true : ''; return business;})
            };
          case deviceConstants.ACTIVATE_FAILURE:
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