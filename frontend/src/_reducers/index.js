import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { forgotpassword } from './forgotpassword.reducer';
import { users } from './users.reducer';
import { business } from './business.reducer';
import { customer } from './customer.reducer';
import { alert } from './alert.reducer';
import { common } from './common.reducer';
import { dashboard } from './dashboard.reducer';
import { visitor } from './visitor.reducer';
import { sidebar } from './sidebar.reducer';
import { locationManager } from './locationmanager.reducer';
import { businessmng } from './businessmng.reducer';
import { device } from './device.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  forgotpassword,
  users,
  business,
  customer,
  alert,
  common,
  dashboard,
  visitor,
  sidebar,
  locationManager,
  businessmng,
  device
});

export default rootReducer;