import { businessmngConstants } from '../_constants';

export function businessmng(state = {}, action) {
  //console.log('this is action type', action.type)
  switch (action.type) {
    case businessmngConstants.REGISTER_REQUEST1:
      return { adding: true };
    case businessmngConstants.REGISTER_SUCCESS1:
      return {};
    case businessmngConstants.REGISTER_FAILURE1:
      return {};
    case businessmngConstants.GET_REQUEST1:
      return {
        loading: true
      };

    case businessmngConstants.GET_SUCCESS1:
      return {
        customerInfo: action.customer.data
      };
    case businessmngConstants.GET_FAILURE1:
      return {
        error: action.error
      };
    case businessmngConstants.GETLOCATION_REQUEST1:
      return {
        loading: true
      };
    case businessmngConstants.GETLOCATION_SUCCESS1:
      return {
        customerLocation: action.customerLocation.data
      };
    case businessmngConstants.GETLOCATION_FAILURE1:
      return {
        error: action.error
      };
    case businessmngConstants.GETALL_SUCCESS1:
      return {
        items: action.customer.data
      };
    case businessmngConstants.GETALL_REQUEST1:
      return {
        loading: true
      };
    case businessmngConstants.GETALL_FAILURE1:
      return {
        error: action.error
      };
    case businessmngConstants.UPDATE_REQUEST1:
      return { updating: true };
    case businessmngConstants.UPDATE_SUCCESS1:
      return {};
    case businessmngConstants.UPDATE_FAILURE1:
      return {};
    case businessmngConstants.GET_PROFILE_REQUEST1:
      return {
        loading: true
      };
    case businessmngConstants.GET_PROFILE_SUCCESS1:
      return {
        customerprofile: action.customer.data
      };
    case businessmngConstants.GET_PROFILE_FAILURE1:
      return {
        error: action.error
      };
    case businessmngConstants.DELETE_REQUEST1:
      // add 'deleting:true' property to customer being deleted
      return {
        ...state,
        items: state.items.map(customer =>
          customer.id === action.id
            ? { ...customer, deleting: true }
            : customer
        )
      };
    case businessmngConstants.DELETE_SUCCESS1:
      // inactivate customer from state
      return {
        items: state.items.map(customer => {
          (customer._id == action.id) ? customer.status = false : '';
          return customer;
        })
      };
    case businessmngConstants.DELETE_FAILURE1:
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
    case businessmngConstants.ACTIVATE_REQUEST1:
      // add 'deleting:true' property to customer being deleted
      return {
        ...state,
        items: state.items.map(customer =>
          customer.id === action.id
            ? { ...customer, activating: true }
            : customer
        )
      };
    case businessmngConstants.ACTIVATE_SUCCESS1:
      // activate customer from state
      const actionCustomer = action.customer;
      return {
        items: state.items.map(customer => {
          (customer._id == actionCustomer._id) ? customer.status = true : '';
          return customer;
        })
      };
    case businessmngConstants.ACTIVATE_FAILURE:
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