import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';
import { businessActions, userActions, businessMngActions, commonActions } from '../_actions';
import { Sidebar } from '../Sidebar/Sidebar';
import { Modal } from 'react-bootstrap';
import Webcam from "react-webcam";
import { Header } from '../Header/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import NumberFormat from 'react-number-format';
var _ = require('lodash');

class EditBusinessMngPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        firstname: '',
        business_id: '',
        username: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        dob: '',
        gender: '',
        facebook: '',
        linkedin: '',
        twitter: ''
      },
      submitted: false,
      invalid: false,
      mail: true,
      modal: false,
      webcamRef: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    const customerId = this.props.match.params.mgr_id;
    //console.log("customerId" , customerId);
    this.props.getCustomerById(customerId).then(user => {
      let customer = {
        firstname: user.data.firstname,
        business_id: user.data.userprofileData[0].business_id,
        lastname: user.data.lastname,
        username: user.data.username,
        email: user.data.email,
        phone: user.data.userprofileData[0].phone,
        address: user.data.userprofileData[0].address,
        city: user.data.userprofileData[0].city,
        state: user.data.userprofileData[0].state,
        country: user.data.userprofileData[0].country,
        dob: user.data.userprofileData[0].dob,
        gender: user.data.userprofileData[0].gender,
        facebook: user.data.userprofileData[0].facebook,
        linkedin: user.data.userprofileData[0].linkedin,
        twitter: user.data.userprofileData[0].twitter
      }
      this.setState({ customer });
      this.props.regionsList(customer.country);
    });
    const { user } = this.props.authentication;
    //const {userprofileData} = this.state.customer.customerprofile;
    // console.log("LOCATION OF USER", userprofileData[0]['location_id'] );
    const authUser = user;
    if (authUser && authUser.role == 'businessOwner') {
      this.props.getBusiness(authUser._id);
    } else if (authUser && authUser.role == 'businessManager') {
      this.props.getBusiness(authUser.userprofileData.business_owner_id);
    } else {
      this.props.getBusiness();
    }
    this.props.countriesList();
  }

  ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { customer } = this.state;
    //console.log(customer);
    if (name == 'country') {
      this.props.regionsList(value);
    }
    if (name == 'business_id') {
      this.props.getBusinessLocations(value);
    }
    if (name == 'email') {
      this.ValidateEmail(value) ? this.setState({ mail: true }) : this.setState({ mail: false });
    }
    this.setState({
      customer: {
        ...customer,
        [name]: value
      }
    });
  }

  checkCustomer = () => {
    let result = true;
    let customer = this.state.customer;
    const { user } = this.props.authentication;
    Object.keys(customer).forEach(function (key) {
      let status = ["facebook", "linkedin", "twitter"].includes(key);
      if ((customer[key] == '' || customer[key] == null) && !status) {
        result = false;
      }
    });
    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true, invalid: false });
    const { customer } = this.state;
    const customerId = this.props.match.params.mgr_id;
    let userId = customerId;
    //console.log('submitting stateUser', stateUser);
    if (this.checkCustomer() && this.state.mail) {
      customer._id = userId;
      customer.user_id = userId;
      if (customer.country == "") { customer.country = null }
      if (customer.state == "") { customer.state = null }
      this.props.updateCustomerById(customer);
    }
    else {
      this.setState({ invalid: true });
    }
  }

  uploadPic = (e) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append('file', file);
      this.props.updateProfilePic(this.props.match.params.mgr_id, formData);
    }
  }


  setRef = (ref) => {
    this.setState({ webcamRef: ref });
  }

  capture = (props) => {
    const imageSrc = this.state.webcamRef.getScreenshot();
    fetch(imageSrc)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) {
        let file = new File([buf], `${props.customerprofile.firstname}.jpeg`, { type: 'image/jpeg' });
        let formData = new FormData();
        formData.append('file', file);
        const { customerprofile } = props;
        props.updateProfilePic(customerprofile._id, formData);
      })
    this.setState({ modal: false });
  };

  getValue = (locations, allLocations) => {
    if (Array.isArray(locations) && Array.isArray(allLocations)) {
      if (locations.length == allLocations.length) {
        return 'all';
      } else {
        return locations[0];
      }
    }
    return null;
  }



  render() {
    const { alert, business, updating, customerprofile, countries, regions, userprofile } = this.props;
    const { user } = this.props.authentication;
    const { userprofileData } = customerprofile ? customerprofile : {};
    const { customer, errorMessage } = this.state

    return (
      <div>
        <Sidebar {...this.props} />
        <div className="wrapper">
          <Header />
          {errorMessage &&
            <div className={`alert alert-danger`}>{errorMessage}</div>
          }
          {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          }
          <div className="row my-5">
            <div className="container-fluid">
              <div className="row mb-3">
                <div className="col-6">
                  <h3>Edit customer</h3>
                </div>
                {/* <div className="col-6 d-flex justify-content-end align-items-center">
                  <Link to={`/business-manager/${this.props.match.params.b_id}`} className=""><i class="fa fa-arrow-circle-left fa-fw"></i></Link>
                </div> */}
              </div>
              <Form onSubmit={this.handleSubmit}>
                {/* {user.role == 'admin' ? <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <h3>Business</h3>
                        <div className="row">
                          <div className="col-md-6 col-sm-6 col-12">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Business {user && user.role === 'admin' ? null : <span className="text-danger">*</span>}</Form.Label>
                              <Form.Control name="business_id" as="select" value={customer.business_id} onChange={this.handleChange}>
                                <option >Select business</option>
                                {Array.isArray(business.items) ?
                                  business.items.map((business, index) =>
                                    <option value={business._id}>{business.business_name}</option>
                                  ) : null};
                                              </Form.Control>
                            </Form.Group>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div> : null} */}
                <div className="row my-3">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4 pl-0">
                        <div className="card card-user shadow">
                          <div className="image"></div>
                          <div className="card-body">
                            <div className="author">
                              <a>
                                <Image style={{ maxWidth: '10em' }} src={customerprofile && customerprofile.userprofileData.length > 0 && customerprofile.userprofileData[0].photo ? config.apiUrl.substring(0, config.apiUrl.length - 3) + customerprofile.userprofileData[0].photo : 'https://dummyimage.com/122x122/eee/0011ff.jpg'} roundedCircle />
                                <input id="userImage" type="file" onChange={(e) => this.uploadPic(e)} name="myImage" accept="image/*" hidden />
                                <h5 className="">{(customerprofile && !customer.firstname) ? customerprofile.firstname : customer.firstname} {(customerprofile && !customer.lastname) ? customerprofile.lastname : customer.lastname}</h5>
                              </a>
                              <p className="description">
                                {(customerprofile && !customer.email) ? customerprofile.email : customer.email}
                              </p>
                            </div>
                            <div className="row">
                              <div className="col-6 text-right">
                                <Button onClick={() => document.getElementById('userImage').click()} variant="primary" className="btn-sm">
                                  Upload Image
                                    </Button>
                              </div>
                              <div className="col-6">
                                <Button onClick={() => this.setState({ modal: true })} variant="primary" className="btn-sm">
                                  Enroll Face
                                    </Button>
                              </div>
                            </div>
                            <Modal show={this.state.modal}>
                              <Modal.Body>
                                <Webcam
                                  height={'100%'}
                                  width={'100%'}
                                  ref={this.setRef}
                                  screenshotFormat="image/jpeg"
                                />
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({ modal: false })}>
                                  Close
                             </Button>
                                <Button variant="primary" onClick={() => this.capture(this.props)}>
                                  Take Photo
                               </Button>
                              </Modal.Footer>
                            </Modal>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-8 pr-0">
                        <div className="card shadow">

                          <div className="card-header">
                            <h5 className="">Edit Customer</h5>
                          </div>
                          <div className="card-body">

                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="firstname" placeholder="Enter your firstname" value={customer.firstname} onChange={this.handleChange} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="lastname" placeholder="Enter your lastname" value={customer.lastname} onChange={this.handleChange} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="email" placeholder="Enter your email" value={customer.email} onChange={this.handleChange} />
                              {!this.state.mail ? <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid email</span> : null}
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Username <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="username" placeholder="Enter Username" value={customer.username} onChange={this.handleChange} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                              {/* <Form.Control type="text" name="phone" placeholder="Enter your phone" value={customer.phone} onChange={this.handleChange} /> */}
                              <NumberFormat format="+1 (###) ###-####" mask="_" name="phone" class="form-control" value={customer.phone} placeholder="Enter your phone" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="address" placeholder="Enter your address" value={customer.address} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>City <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="city" placeholder="Enter your city" value={customer.city} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                              <Form.Control name="country" as="select" value={customer.country} onChange={this.handleChange}  >
                                <option value="0">Select country</option>
                                {countries && countries.length &&
                                  countries.map((country, index) =>
                                    <option value={country._id}>{country.name}</option>
                                  )};
                                            </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>State <span className="text-danger">*</span></Form.Label>
                              <Form.Control name="state" as="select" value={customer.state} onChange={this.handleChange}  >
                                <option >Select state</option>
                                {regions && regions.length &&
                                  regions.map((region, index) =>
                                    <option value={region._id}>{region.name}</option>
                                  )};
                                      </Form.Control>
                            </Form.Group>



                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Date of birth <span className="text-danger">*</span></Form.Label>
                              {/* <Form.Control type="text" name="dob" placeholder="Enter your DOB" value={customer.dob} onChange={this.handleChange} /> */}

                              <NumberFormat format="##/##/####" name="dob" placeholder="DD/MM/YYYY" id="formBasicPassword" class="form-control" mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']} value={customer.dob} onChange={this.handleChange} />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label className="pr-3">Gender <span className="text-danger">*</span></Form.Label>
                              <Form.Check inline label="Male" name="gender" type="radio" value="male" checked={customer.gender == 'male'} onChange={this.handleChange} />
                              <Form.Check inline label="Female" name="gender" type="radio" value="female" checked={customer.gender == 'female'} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Facebook Profile</Form.Label>
                              <Form.Control type="text" name="facebook" placeholder="Enter your Fb profile" value={customer.facebook} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Linkedin Profile</Form.Label>
                              <Form.Control type="text" name="linkedin" placeholder="Enter your Linkedin profile" value={customer.linkedin} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Twitter Profile</Form.Label>
                              <Form.Control type="text" name="twitter" placeholder="Enter your Insta profile" value={customer.twitter} onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" className="customBtn" type="submit">
                              Update Customer
                                    </Button>
                          </div>
                          <div className="row">
                            {this.state.invalid ?
                              <div className="col-12"><div className={`alert alert-danger`}>Please fill all fields</div></div> : null
                            }
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

function mapState(state) {
  const { alert, business, authentication } = state;
  const { customerprofile } = state.businessmng;
  const { userprofile } = state.users;
  console.log("state------------", state);
  const { countries, regions } = state.common;
  return { alert, customerprofile, business, countries, regions, authentication, userprofile };
}

const actionCreators = {
  getCustomerById: businessMngActions.getCustomerById,
  getBusiness: businessActions.getAllBusiness,
  countriesList: commonActions.getCountries,
  getBusinessLocations: businessActions.getBusinessLocations,
  regionsList: commonActions.getRegions,
  updateCustomerById: businessMngActions.updateCustomerById,
  updateProfilePic: businessMngActions.updateProfilePic
}


const connectedEditBusinessMngPage = connect(mapState, actionCreators)(EditBusinessMngPage);
export { connectedEditBusinessMngPage as EditBusinessMngPage };