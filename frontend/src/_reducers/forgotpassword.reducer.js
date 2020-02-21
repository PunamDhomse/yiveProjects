import { userConstants } from '../_constants';

export function forgotpassword(state = {}, action) {
  switch (action.type) {
    case userConstants.FORGOTPASSWORD_REQUEST:
      return { emailing: true };
    case userConstants.FORGOTPASSWORD_SUCCESS:
      return {
        success:true
      };
    case userConstants.FORGOTPASSWORD_FAILURE:
      return {};
    default:
      return state
  }
}
