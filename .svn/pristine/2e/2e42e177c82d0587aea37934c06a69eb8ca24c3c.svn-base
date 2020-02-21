import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { businessActions, userActions, customerActions, commonActions } from '../_actions';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { Modal } from 'react-bootstrap';
import Webcam from "react-webcam";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Autocomplete from 'react-autocomplete';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { DOBpicker } from '../dobPicker';
import NumberFormat from 'react-number-format';

class AddCustomerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        firstname: '',
        business_id: null,
        location_id: 'all',
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
      autoValue: '',
      submitted: false,
      noCameraPermission: false,
      file: null,
      invalid: false,
      mail: true,
      modal: false,
      webcamRef: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { user } = this.props.authentication;
    const authUser = user;
    if (authUser && authUser.role == 'businessOwner') {
      this.props.getBusiness(authUser._id);
    } else if (authUser && authUser.role == 'businessManager') {
      this.props.getBusiness(authUser.userprofileData.business_owner_id);
    } else if (authUser && authUser.role == 'locationManager') {
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
    if (name == 'business_id') {
      this.props.getBusinessLocations(value);
    }
    if (name == 'country') {
      this.props.regionsList(value);
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
      let status = ["facebook", "linkedin", "twitter", "email", "phone", "address", "city", "state", "country", "dob", "gender"].includes(key);
      if (user && user.role !== 'businessOwner') {
        status = ["facebook", "linkedin", "twitter", "email", "phone", "address", "city", "state", "country", "dob", "gender", "business_id", "location_id"].includes(key);
      }
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
    if (this.checkCustomer() && this.state.mail) {
      customer.role = 'customer';
      customer['username'] = Math.random().toString(36).substring(7);
      if (customer.state == '') { customer.state = null; }
      if (customer.country == '') { customer.country = null; }
      if (customer.location_id == 'all') {
        customer['location_id'] = null;
      }
      if (customer.location_id == '') {
        delete customer.location_id;
      }
      this.props.newCustomerAdded(customer, this.state.file, '').then(() => {
        this.props.closeModal();
      });
      // this.props.newUser(user);
    }
    else {
      this.setState({ invalid: true });
    }
  }


  uploadPic = (e) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      this.setState({ file: file });
      var fr = new FileReader();
      fr.onload = this.onFileReaderLoad;
      fr.readAsDataURL(file);
    }
  }

  setRef = (ref) => {
    this.setState({ webcamRef: ref });
  }

  capture = (props) => {
    const imageSrc = this.state.webcamRef.getScreenshot();
    this.fetchfile(imageSrc).then((file) => {
      var fr = new FileReader();
      fr.onload = this.onFileReaderLoad;
      fr.readAsDataURL(file);
      this.setState({ modal: false, file: file });
    });
  };

  fetchfile = (imageSrc) => {
    return new Promise((resolve, reject) => {
      fetch(imageSrc)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) {
          let file = new File([buf], `${Math.random().toString(36).substring(7)}.jpeg`, { type: 'image/jpeg' });
          return resolve(file);
        })
    });
  }

  onFileReaderLoad(e) {
    document.getElementById('pimg').setAttribute('src', e.target.result);
  };

  findSelected = (value) => {
    let selected = this.props.business.items.filter(elem => elem.business_name == value);
    selected = selected[0]._id;
    let event = {
      target: {
        name: 'business_id',
        value: selected
      }
    }
    this.handleChange(event);
  }

  render() {
    const { alert, business, adding, countries, regions } = this.props;
    const { user } = this.props.authentication;
    const { customer, customerError } = this.state;
    const { businessLocation } = business;
    let autoComplete = [];
    if (business.items && business.items.length) {
      autoComplete = business.items.map(elem => {
        return { label: elem.business_name, _id: elem._id }
      });
    }
    return (
      <div>
        {/* <Sidebar {...this.props} /> */}
        {/* <div className="wrapper"> */}
        {/* <Header /> */}
        <div className="row">
          <div className="container-fluid mt-0">
            <div className="row">
              {customerError &&
                <div className="col-12"><div className={`alert alert-danger`}>{customerError}</div></div>
              }
              {alert.message &&
                <div className="col-12"><div className={`alert ${alert.type}`}>{alert.message}</div></div>
              }
            </div>
            {/* <div className="row">
                <div className="col-12">
                  <h3>Add New Individual</h3>
                </div>
                <div className="col-3 d-flex justify-content-end align-items-center">
                  <Link to="/customer" className=""><i class="fa fa-arrow-circle-left fa-fw"></i></Link>
                </div>
              </div> */}
            <Form onSubmit={this.handleSubmit}>
              {/* <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <h3>Business</h3>
                        <div className="row">
                          <div className="col-md-6 col-sm-6 col-12 p-0">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Business {user && user.role === 'admin' ? null : <span className="text-danger">*</span>}</Form.Label>
                              <Form.Control name="business_id" as="select" value={customer.business_id} onChange={this.handleChange}>
                                <option >Select business</option>
                                {business.items && business.items.length &&
                                  business.items.map((business, index) =>
                                    <option value={business._id}>{business.business_name}</option>
                                  )};
                                              </Form.Control>
                            </Form.Group>
                          </div>
                          <div className="col-md-6 col-sm-6 col-12 pl-0 pl-sm-3 pr-0">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Location {user && user.role === 'admin' ? null : <span className="text-danger">*</span>}</Form.Label>
                              <Form.Control name="location_id" as="select" value={customer.location_id} onChange={this.handleChange}>
                                <option >Select Location</option>
                                <option value="all">All Locations</option>
                                {businessLocation && businessLocation.length &&
                                  businessLocation.map((business, index) =>
                                    <option value={business._id}>{business.name}</option>
                                  )};
                                              </Form.Control>
                            </Form.Group>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div> */}
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    {/* <div className="col-xl-4 col-lg-12 col-md-12 col-12 pl-0 pr-0 pr-xl-3">
                        <div className="card card-user shadow">
                          <div className="image"></div>
                          <div className="card-body">
                            <div className="author">
                              <a>
                                <Image id="pimg" style={{ maxWidth: '10em' }} src="https://dummyimage.com/122x122/eee/0011ff.jpg" roundedCircle />
                                <input id="userImage" type="file" onChange={(e) => this.uploadPic(e)} name="myImage" accept="image/*" hidden />
                                <h5 className="">New Individual Record</h5>
                              </a>
                              <p className="description">
                                New User
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
                                {this.state.noCameraPermission ? <div className="text-center">
                                  No permissions to access camera
                              </div> : null}
                                <Webcam
                                  height={'100%'}
                                  width={'100%'}
                                  ref={this.setRef}
                                  screenshotFormat="image/jpeg"
                                  onUserMedia={() => this.setState({ noCameraPermission: false })}
                                  onUserMediaError={() => this.setState({ noCameraPermission: true })}
                                />
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({ modal: false, noCameraPermission: false })}>
                                  Close
                             </Button>
                                <Button disabled={this.state.noCameraPermission} variant="primary" onClick={() => this.capture(this.props)}>
                                  Take Photo
                               </Button>
                              </Modal.Footer>
                            </Modal>

                          </div>
                        </div>
                      </div> */}
                    <div className="col-md-6 col-sm-12">

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" name="firstname" placeholder="Enter your firstname" value={customer.firstname} onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" name="lastname" placeholder="Enter your lastname" value={customer.lastname} onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" placeholder="Enter your email" value={customer.email} onChange={this.handleChange} />
                        {!this.state.mail ? <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid email</span> : null}
                      </Form.Group>
                    </div>
                    {/* <div className="col-md-6 col-sm-12">

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Username" value={customer.username} onChange={this.handleChange} />
                      </Form.Group>
                    </div> */}
                    <div className="col-md-6 col-sm-12">

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Phone</Form.Label>
                        {/* <Form.Control type="text" name="phone" placeholder="Enter your phone" value={customer.phone} onChange={this.handleChange} /> */}
                        <NumberFormat format="+1 (###) ###-####" mask="_" name="phone" class="form-control" placeholder="Enter your phone" onChange={this.handleChange} />
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows="2" data-fieldname="address" name="address" placeholder="Enter your address" value={customer.address} onChange={this.handleChange} />
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" placeholder="Enter your city" value={customer.city} onChange={this.handleChange} />
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Country</Form.Label>
                        <Form.Control name="country" as="select" value={customer.country} onChange={this.handleChange}>
                          <option value="0">Select country</option>
                          {countries && countries.length &&
                            countries.map((country, index) =>
                              <option value={country._id}>{country.name}</option>
                            )};
                                              </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>State</Form.Label>
                        <Form.Control name="state" as="select" value={customer.state} onChange={this.handleChange}>
                          <option >Select state</option>
                          {regions && regions.length &&
                            regions.map((region, index) =>
                              <option value={region._id}>{region.name}</option>
                            )};
                                              </Form.Control>
                      </Form.Group>
                    </div>


                    <div className="col-md-6 col-sm-12">

                      <Form.Group controlId="formBasicPassword">
                        {/* <Form.Label>Date of birth</Form.Label> */}
                        {/* <Form.Control type="text" name="dob" placeholder="Enter your DOB" value={customer.dob} onChange={this.handleChange}/> */}
                        {/* <NumberFormat format="##/##/####" name="dob" placeholder="DD/MM/YYYY" id="formBasicPassword" class="form-control" mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']} value={customer.dob} onChange={this.handleChange} /> */}
                        <DOBpicker value={customer.dob} change={this.handleChange} />
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Facebook Profile</Form.Label>
                        <Form.Control type="text" name="facebook" placeholder="Enter your Fb profile" value={customer.facebook} onChange={this.handleChange} />
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Linkedin Profile</Form.Label>
                        <Form.Control type="text" name="linkedin" placeholder="Enter your Linkedin profile" value={customer.linkedin} onChange={this.handleChange} />
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Twitter Profile</Form.Label>
                        <Form.Control type="text" name="twitter" placeholder="Enter your Twitter profile" value={customer.twitter} onChange={this.handleChange} />
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label className="pr-3">Gender</Form.Label><br />
                        <Form.Check inline name="gender" label="Male" type="radio" value="male" checked={customer.gender == 'male'} onChange={this.handleChange} />
                        <Form.Check inline name="gender" label="Female" type="radio" value="female" checked={customer.gender == 'female'} onChange={this.handleChange} />
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12 in-div-100">
                      {/* <div className="card"> */}
                      {/* <div className="card-header">
                            <h5 className="">Individual</h5>
                          </div> */}
                      {/* <div className="card-body"> */}
                      <label>Business</label>
                      <br />
                      <Autocomplete
                        getItemValue={(item) => item.label}
                        items={autoComplete}
                        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        renderItem={(item, isHighlighted) =>
                          <div>
                            {item.label}
                          </div>
                        }
                        inputProps={{
                          style: {
                            display: 'block',
                            width: '100%',
                            height: 'calc(1.5em + .75rem + 2px)',
                            padding: '.375rem .75rem',
                            fontSize: '1rem',
                            fontWeight: 400,
                            lineHeight: 1.5,
                            color: '#495057',
                            backgroundColor: '#fff',
                            backgroundClip: ' padding-box',
                            border: '1px solid #ced4da',
                            borderRadius: '.25rem'
                          }
                        }}
                        value={this.state.autoValue}
                        onChange={(e) => this.setState({ autoValue: e.target.value })}
                        onSelect={(val) => { this.setState({ autoValue: val }); this.findSelected(val) }}
                      />


                      {/* <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Business {user && user.role === 'admin' ? null : <span className="text-danger">*</span>}</Form.Label>
                        <Form.Control name="business_id" as="select" value={customer.business_id} onChange={this.handleChange}>
                          <option >Select business</option>
                          {business.items && business.items.length &&
                            business.items.map((business, index) =>
                              <option value={business._id}>{business.business_name}</option>
                            )};
                                              </Form.Control>
                      </Form.Group> */}
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Location {user && user.role === 'admin' ? null : <span className="text-danger">*</span>}</Form.Label>
                        <Form.Control name="location_id" as="select" value={customer.location_id} onChange={this.handleChange}>
                          <option value="all">Select Location</option>
                          <option>All Locations</option>
                          {businessLocation && businessLocation.length &&
                            businessLocation.map((business, index) =>
                              <option value={business._id}>{business.name}</option>
                            )};
                                              </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Type </Form.Label>
                        <Form.Control name="location_id" as="select" onChange={this.handleChange}>
                          <option value="all">--Select Type--</option>
                          <option>Student</option>
                          <option>Member</option>
                          <option>Parent</option>
                          <option>Child</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <Button variant="primary" className="customBtn" type="submit">
                        Submit
                                    </Button>
                      {/* &nbsp;&nbsp;<Button onClick={this.props.closeModal}>Close</Button> */}
                      {adding &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                    </div>

                    {/* </div> */}
                    {this.state.invalid ?
                      <div className="col-12"><div className={`alert alert-danger`}>Please fill all required fields</div></div> : null
                    }
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
        {/* </div> */}
      </div>

    );
  }
}

function mapState(state) {
  const { alert, business, adding, authentication } = state;
  const { countries, regions } = state.common;
  return { alert, business, adding, countries, regions, authentication };


}

const actionCreators = {
  newCustomerAdded: customerActions.newCustomer,
  getBusiness: businessActions.getAllBusiness,
  countriesList: commonActions.getCountries,
  getBusinessLocations: businessActions.getBusinessLocations,
  regionsList: commonActions.getRegions
}

const connectedAddCustomerPage = connect(mapState, actionCreators)(AddCustomerPage);
export { connectedAddCustomerPage as AddCustomerPage };