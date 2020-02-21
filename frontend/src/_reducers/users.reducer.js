import { userConstants } from '../_constants';


export function users(state = {}, action) {
  //console.log('this is action type', action.type)
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users.data
      };
   case userConstants.GETALL_FAILURE:
          return { 
            error: action.error
          };
    case userConstants.GETUSER_REQUEST:
      return {
              loading: true
    };
    case userConstants.GETUSER_SUCCESS:
      return {
            user: action.user.data
    };
    case userConstants.GETUSER_FAILURE:
      return { 
              error: action.error
    };
    case userConstants.GET_PROFILE_REQUEST:
      return {
              loading: true
    };
    case userConstants.GET_PROFILE_SUCCESS:
      return {
            userprofile: action.user.data
    };
    case userConstants.GET_PROFILE_FAILURE:
      return { 
              error: action.error
    };
    case userConstants.GET_USERINFO_REQUEST:
      return {
              loading: true
    };

    case userConstants.GET_USERINFO_SUCCESS:
      return {
            userinfo: action.user.data
    };
    case userConstants.GET_USERINFO_FAILURE:
      return { 
              error: action.error
    };
    case userConstants.UPDATE_REQUEST:
      return { updating: true };
    case userConstants.UPDATE_SUCCESS:
      return {
                error: action.result
            };
    case userConstants.UPDATE_FAILURE:
      return {};
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // inactivate user from state
      return {
        items: state.items.map(user => {var tempUser = Object.assign({}, user); (tempUser._id == action.id) ? tempUser.status = false : ''; return tempUser;})
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
      case userConstants.ACTIVATE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
          ...state,
          items: state.items.map(user =>
            user.id === action.id
              ? { ...user, activating: true }
              : user
          )
        };
      case userConstants.ACTIVATE_SUCCESS:
        // activate user from state
        const actionUser = action.user;
        return {
          items: state.items.map(user => {var tempUser = Object.assign({}, user); (tempUser._id == actionUser._id) ? tempUser.status = true : ''; return tempUser;})
        };
      case userConstants.ACTIVATE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
          ...state,
          items: state.items.map(user => {
            if (user.id === action.id) {
              // make copy of user without 'deleting:true' property
              const { activating, ...userCopy } = user;
              // return copy of user with 'deleteError:[error]' property
              return { ...userCopy, activateError: action.error };
            }
  
            return user;
          })
        };
    default:
      return state
  }
}