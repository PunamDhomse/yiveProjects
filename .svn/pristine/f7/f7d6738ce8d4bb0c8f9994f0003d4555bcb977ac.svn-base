import { customerConstants } from '../_constants';

export function customer(state = {}, action) {
  //console.log('this is action type', action.type)
  switch (action.type) {
    case customerConstants.REGISTER_REQUEST:
      return { adding: true };
    case customerConstants.REGISTER_SUCCESS:
      return {};
    case customerConstants.REGISTER_FAILURE:
      return {};
    case customerConstants.GET_REQUEST:
        return {
          loading: true
        };

    case customerConstants.GET_SUCCESS:
          return {
            customerInfo: action.customer.data
    };
    case customerConstants.GET_FAILURE:
      return { 
        error: action.error
    };
    case customerConstants.GETLOCATION_REQUEST:
        return {
          loading: true
        };
    case customerConstants.GETLOCATION_SUCCESS:
          return {
            customerLocation: action.customerLocation.data
    };
    case customerConstants.GETLOCATION_FAILURE:
      return { 
        error: action.error
    };
    case customerConstants.GETALL_SUCCESS:
      return {
          items: action.customer.data
        };
    case customerConstants.GETALL_REQUEST:
      return {
            loading: true
        };
    case customerConstants.GETALL_FAILURE:
      return { 
              error: action.error
        };
    case customerConstants.UPDATE_REQUEST:
          return { updating: true };
    case customerConstants.UPDATE_SUCCESS:
          return {};
    case customerConstants.UPDATE_FAILURE:
          return {};
    case customerConstants.GET_PROFILE_REQUEST:
        return {
            loading: true
    };
    case customerConstants.GET_PROFILE_SUCCESS:
      return {
          customerprofile: action.customer.data
      };
    case customerConstants.GET_PROFILE_FAILURE:
      return { 
            error: action.error
      };
    case customerConstants.DELETE_REQUEST:
          // add 'deleting:true' property to customer being deleted
          return {
            ...state,
            items: state.items.map(customer =>
              customer.id === action.id
                ? { ...customer, deleting: true }
                : customer
            )
          };
        case customerConstants.DELETE_SUCCESS:
          // inactivate customer from state
          return {
            items: state.items.map(customer => { 
              (customer._id == action.id) ? customer.status = false : ''; return customer;
            })
          };
        case customerConstants.DELETE_FAILURE:
          // remove 'deleting:true' property and add 'deleteError:[error]' property to customer 
          return {
            ...state,
            items: state.items.map(customer => {
              if (customer.id === action.id) {
                // make copy of customer without 'deleting:true' property
                const { deleting, ...customerCopy } = customer;
                // return copy of customer with 'deleteError:[error]' property
                return { ...customerCopy, deleteError: action.error };
              }
    
              return customer;
            })
          };
          case customerConstants.ACTIVATE_REQUEST:
            // add 'deleting:true' property to customer being deleted
            return {
              ...state,
              items: state.items.map(customer =>
                customer.id === action.id
                  ? { ...customer, activating: true }
                  : customer
              )
            };
          case customerConstants.ACTIVATE_SUCCESS:
            // activate customer from state
            const actionCustomer = action.customer;
            return {
              items: state.items.map(customer => { 
                (customer._id == actionCustomer._id) ? customer['status'] = true : ''; 
                return customer;
              })
            };
          case customerConstants.ACTIVATE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to customer 
            return {
              ...state,
              items: state.items.map(customer => {
                if (customer.id === action.id) {
                  // make copy of customer without 'deleting:true' property
                  const { activating, ...customerCopy } = customer;
                  // return copy of customer with 'deleteError:[error]' property
                  return { ...customerCopy, activateError: action.error };
                }
      
                return customer;
              })
            };
    default:
      return state
  }
}