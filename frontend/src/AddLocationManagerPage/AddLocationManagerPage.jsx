import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { businessActions, userActions, locationmanagerActions, commonActions } from '../_actions';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { Modal } from 'react-bootstrap';
import Webcam from "react-webcam";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import NumberFormat from 'react-number-format';

class AddLocationManagerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationManager: {
        firstname: '',
        business_id: this.props.match.params.b_id,
        location_id: '',
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
        twitter: '',
        username: '',
        password: ''
      },
      submitted: false,
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
    // if (authUser && authUser.role == 'businessOwner') {
    //   this.props.getBusiness(authUser._id).then(data=>{
    //     let locationManager = this.state.locationManager;
    //     locationManager['business_id'] = data.data[0]._id;
    //     this.props.getBusinessLocations(data.data[0]._id);
    //     this.setState({ locationManager });
    //   });;
    // } else if (authUser && authUser.role == 'businessManager') {
    //   this.props.getBusiness(authUser.userprofileData.business_owner_id).then(data=>{
    //     let locationManager = this.state.locationManager;
    //     locationManager['business_id'] = data.data[0]._id;
    //     this.setState({ locationManager });
    //   });
    // } else {
    //   this.props.getBusiness();
    // }
    this.props.getBusinessLocations(this.props.match.params.b_id);
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
    const { locationManager } = this.state;
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
      locationManager: {
        ...locationManager,
        [name]: value
      }
    });
  }

  checkLocationManager = () => {
    let result = true;
    let locationManager = this.state.locationManager;
    Object.keys(locationManager).forEach(function (key) {
      let status = ["facebook", "linkedin", "twitter"].includes(key);
      if (locationManager[key] == '' && !status) {
        result = false;
      }
    });
    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true, invalid: false });
    const { locationManager } = this.state;
    if (this.checkLocationManager() && this.state.mail) {
      locationManager.role = 'locationManager';
      // locationManager.username = locationManager.email;
      if (locationManager.state == '') { locationManager.state = null; }
      if (locationManager.country == '') { locationManager.country = null; }
      this.props.newLocationManagerAdded(locationManager, this.state.file);
      // this.props.newLocationManager(locationManager);
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

  render() {
    const { alert, business, adding, countries, regions } = this.props;
    const { locationManager, locationManagerError } = this.state;
    const { user } = this.props.authentication;
    const { businessLocation } = business;

    return (
      <div>
        <Sidebar {...this.props} />
        <div className="wrapper">
          <Header />
          <div className="row my-5">
            <div className="container-fluid">
              <div className="row">
                {locationManagerError &&
                  <div className="col-12"><div className={`alert alert-danger`}>{locationManagerError}</div></div>
                }
                {alert.message &&
                  <div className="col-12"><div className={`alert ${alert.type}`}>{alert.message}</div></div>
                }
              </div>
              <div className="row mb-3">
                <div className="col-9">
                  <h3>Add New Location Manager</h3>
                </div>
                {/* <div className="col-3 d-flex justify-content-end align-items-center">
                  <Link to={`/locationMgr/${this.props.match.params.b_id}`} className=""><i class="fa fa-arrow-circle-left fa-fw"></i></Link>
                </div> */}
              </div>
              <Form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        {/* <h3>Business</h3> */}
                        <div className="row">
                          {/* {user.role == 'admin' ? <div className="col-md-6 col-sm-6 col-12 p-0">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Business <span className="text-danger">*</span></Form.Label>
                              <Form.Control name="business_id" as="select" value={locationManager.business_id} onChange={this.handleChange}>
                                <option >Select business</option>
                                {business.items && business.items.length &&
                                  business.items.map((business, index) =>
                                    <option value={business._id}>{business.business_name}</option>
                                  )};
                                              </Form.Control>
                            </Form.Group>
                          </div> : null} */}
                          <div className="col-md-6 col-sm-6 col-12 pl-0 pl-sm-3 pr-0">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                              <Form.Control name="location_id" as="select" value={locationManager.location_id} onChange={this.handleChange}>
                                <option >Select Location</option>
                                {/* <option value="all">All Locations</option> */}
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
                </div>
                <div className="row my-3">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-xl-4 col-lg-12 col-md-12 col-12 pl-0 pr-0 pr-xl-3">
                        <div className="card card-user shadow">
                          <div className="image"></div>
                          <div className="card-body">
                            <div className="author">
                              <a>
                                <Image id="pimg" style={{ maxWidth: '10em' }} src="https://dummyimage.com/122x122/eee/0011ff.jpg" roundedCircle />
                                <input id="userImage" type="file" onChange={(e) => this.uploadPic(e)} name="myImage" accept="image/*" hidden />
                                <h5 className="">New Location Manager Record</h5>
                              </a>
                              <p className="description">
                                New Location Manager
                                     </p>
                            </div>
                            <div className="row">
                              <div className="col-6">
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
                      <div className="col-xl-8 col-md-12 col-sm-12 col-12 pr-0 pl-0 pl-xl-3 mt-3 mt-xl-0">
                        <div className="card shadow">
                          <div className="card-header">
                            <h5 className="">Location Manager</h5>
                          </div>
                          <div className="card-body">

                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="firstname" placeholder="Enter your firstname" value={locationManager.firstname} onChange={this.handleChange} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="lastname" placeholder="Enter your lastname" value={locationManager.lastname} onChange={this.handleChange} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="email" placeholder="Enter your email" value={locationManager.email} onChange={this.handleChange} />
                              {!this.state.mail ? <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid email</span> : null}
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Username <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="username" placeholder="Enter your username" value={locationManager.username} onChange={this.handleChange} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="password" name="password" placeholder="Enter your password" value={locationManager.password} onChange={this.handleChange} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                              {/* <Form.Control type="text" name="phone" placeholder="Enter your phone" value={locationManager.phone} onChange={this.handleChange} /> */}
                              <NumberFormat format="+1 (###) ###-####" mask="_" name="phone" class="form-control" placeholder="Enter your phone" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="address" placeholder="Enter your address" value={locationManager.address} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>City <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="city" placeholder="Enter your city" value={locationManager.city} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                              <Form.Control name="country" as="select" value={locationManager.country} onChange={this.handleChange}>
                                <option value="0">Select country</option>
                                {countries && countries.length &&
                                  countries.map((country, index) =>
                                    <option value={country._id}>{country.name}</option>
                                  )};
                                              </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>State <span className="text-danger">*</span></Form.Label>
                              <Form.Control name="state" as="select" value={locationManager.state} onChange={this.handleChange}>
                                <option >Select state</option>
                                {regions && regions.length &&
                                  regions.map((region, index) =>
                                    <option value={region._id}>{region.name}</option>
                                  )};
                                              </Form.Control>
                            </Form.Group>



                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Date of birth <span className="text-danger">*</span></Form.Label>
                              {/* <Form.Control type="text" name="dob" placeholder="Enter your DOB" value={locationManager.dob} onChange={this.handleChange}/> */}
                              <NumberFormat format="##/##/####" name="dob" placeholder="DD/MM/YYYY" id="formBasicPassword" class="form-control" mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']} value={locationManager.dob} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label className="pr-3">Gender <span className="text-danger">*</span></Form.Label>
                              <Form.Check inline name="gender" label="Male" type="radio" value="male" checked={locationManager.gender == 'male'} onChange={this.handleChange} />
                              <Form.Check inline name="gender" label="Female" type="radio" value="female" checked={locationManager.gender == 'female'} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Facebook Profile</Form.Label>
                              <Form.Control type="text" name="facebook" placeholder="Enter your Fb profile" value={locationManager.facebook} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Linkedin Profile</Form.Label>
                              <Form.Control type="text" name="linkedin" placeholder="Enter your Linkedin profile" value={locationManager.linkedin} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Twitter Profile</Form.Label>
                              <Form.Control type="text" name="twitter" placeholder="Enter your Twitter profile" value={locationManager.twitter} onChange={this.handleChange} />
                            </Form.Group>

                            <Button variant="primary" className="customBtn" type="submit">
                              Create New Location Manager
                                    </Button>
                            {adding &&
                              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }

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
  console.log("State data", state);
  const { alert, business, adding, authentication } = state;
  const { countries, regions } = state.common;
  return { alert, business, adding, countries, regions, authentication };
}

const actionCreators = {
  newLocationManagerAdded: locationmanagerActions.newLocationManager,
  getBusiness: businessActions.getAllBusiness,
  countriesList: commonActions.getCountries,
  getBusinessLocations: businessActions.getBusinessLocations,
  regionsList: commonActions.getRegions
}

const connectedAddLocationManagerPage = connect(mapState, actionCreators)(AddLocationManagerPage);
export { connectedAddLocationManagerPage as AddLocationManagerPage };