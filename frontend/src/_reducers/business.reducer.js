import { businessConstants } from '../_constants';
const INITIAL_STATE = {businessInfo:{}, businessLocation:{}, adding:false, loading:false, error:"", items:{}, updating:false}
export function business(state = INITIAL_STATE, action) {
  //console.log('this is action type', action.type)
  switch (action.type) {
    case businessConstants.REGISTER_REQUEST:
      return { ...state, adding: true };
    case businessConstants.REGISTER_SUCCESS:
      return {};
    case businessConstants.REGISTER_FAILURE:
      return {};
    case businessConstants.GET_REQUEST:
        return {
          ...state, 
          loading: true
        };
    case businessConstants.GET_SUCCESS:
          return {
            ...state,
            loading:false,
            businessInfo: action.business.data
    };
    case businessConstants.GET_FAILURE:
      return { 
        ...state, 
        error: action.error
    };
    case businessConstants.GETLOCATION_REQUEST:
        return {
          ...state, 
          loading: true
        };
    case businessConstants.GETLOCATION_SUCCESS:
          return {
            ...state, 
            businessLocation: action.businessLocation.data
    };
    case businessConstants.GETLOCATION_FAILURE:
      return { 
        ...state, 
        error: action.error
    };
    case businessConstants.GETALL_SUCCESS:
      return {
          ...state, 
          loading:false,
          items: action.business.data
        };
    case businessConstants.GETALL_REQUEST:
      return {
        ...state, 
            loading: true
        };
    case businessConstants.GETALL_FAILURE:
      return { 
        ...state, 
              error: action.error
        };
    case businessConstants.UPDATE_REQUEST:
      return { ...state, 
        updating: true };
    case businessConstants.UPDATE_SUCCESS:
          return {};
    case businessConstants.UPDATE_FAILURE:
          return {};
    case businessConstants.DELETE_REQUEST:
          // add 'deleting:true' property to business being deleted
          return {
            ...state,
            items: state.items.map(business =>
              business.id === action.id
                ? { ...business, deleting: true }
                : business
            )
          };
        case businessConstants.DELETE_SUCCESS:
          // inactivate business from state
          return {
            ...state, 
            items: state.items.map(business => {var tempBusiness = Object.assign({}, business); (tempBusiness._id == action.id) ? tempBusiness.status = false : ''; return tempBusiness;})
          };
        case businessConstants.DELETE_FAILURE:
          // remove 'deleting:true' property and add 'deleteError:[error]' property to business 
          return {
            ...state,
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
          case businessConstants.ACTIVATE_REQUEST:
            // add 'deleting:true' property to business being deleted
            return {
              ...state,
              items: state.items.map(business =>
                business.id === action.id
                  ? { ...business, activating: true }
                  : business
              )
            };
          case businessConstants.ACTIVATE_SUCCESS:
            // activate business from state
            const actionBusiness = action.business;
            return {
              ...state, 
              items: state.items.map(business => {var tempBusiness = Object.assign({}, business); (tempBusiness._id == actionBusiness._id) ? tempBusiness.status = true : ''; return tempBusiness;})
            };
          case businessConstants.ACTIVATE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to business 
            return {
              ...state,
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