import { dashboardConstants } from '../_constants';
const INITIAL_STATE = {counts:{}}

export function dashboard(state = INITIAL_STATE, action) {
  //console.log('this is action type', action.type)
  switch (action.type) {
    case dashboardConstants.GETALL_COUNTS:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.GETALL_COUNTS_SUCCESS:
        return {
          ...state,
          countries: action.countries.data
        };
    case dashboardConstants.GETALL_COUNTS_FAILURE:
            return { 
                ...state,
              error: action.error
            };
    case dashboardConstants.GETALLCUSTOMER_COUNTS_REQUEST:
            return{
                    ...state,
                    loading: true
                  };
    case dashboardConstants.GETALLCUSTOMER_COUNTS_SUCCESS:
            return{
                    ...state,
                    customerCount: action.customers.data
                  };
    case dashboardConstants.GETALLCUSTOMER_COUNTS_FAILURE:
            return{
                    ... state,
                    error: action.error
                  };
    case dashboardConstants.GETALLBUSINESS_COUNTS_REQUEST:
           return{
                  ...state,
                  loading: true
                };
    case dashboardConstants.GETALLBUSINESS_COUNTS_SUCCESS:
            return{
                    ...state,
                    businessCount: action.business.data
                 };
    case dashboardConstants.GETALLBUSINESS_COUNTS_FAILURE:
            return{
                    ... state,
                    error: action.error
                  };
    case dashboardConstants.GETALLVISITOR_COUNTS_REQUEST:
           return{
                  ...state,
                  loading: true
                };
    case dashboardConstants.GETALLVISITOR_COUNTS_SUCCESS:
            return{
                    ...state,
                    visitorCount: action.visitor.data
                 };
    case dashboardConstants.GETALLVISITOR_COUNTS_FAILURE:
            return{
                    ... state,
                    error: action.error
                  };
    case dashboardConstants.GETALLCUSTOMER_REQUEST:
            return{
                    ...state,
                    loading: true
                  };
    case dashboardConstants.GETALLCUSTOMER_SUCCESS:
            return{
                    ...state,
                    customersList: action.customers.data
                  };
    case dashboardConstants.GETALLCUSTOMER_FAILURE:
            return{
                    ... state,
                    error: action.error
                  };
    case dashboardConstants.GETALLVISITOR_REQUEST:
            return{
                    ...state,
                    loading: true
                  };
    case dashboardConstants.GETALLVISITOR_SUCCESS:
            return{
                    ...state,
                    visitorsList: action.visitor.data
                  };
    case dashboardConstants.GETALLVISITOR_FAILURE:
            return{
                    ... state,
                    error: action.error
                  };

    default:
            return state;
  }
}
