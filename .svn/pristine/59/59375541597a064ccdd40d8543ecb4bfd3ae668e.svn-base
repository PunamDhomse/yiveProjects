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
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import NumberFormat from 'react-number-format';

class SelfEnrollPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        firstname: '',
        business_id: '',
        location_id: '',
        lastname: '',
        email: '',
        phone: '',
      },
      submitted: false,
      noCameraPermission: false,
      file: null,
      invalid: false,
      mail: true,
      modal: false,
      webcamRef: null,
      singleLocation: true,
      bigError: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.b_id) {
      this.props.getBusinessById(this.props.match.params.b_id).then(res => {
        this.props.getBusinessLocations(this.props.match.params.b_id).then(locs => {
          let customer = this.state.customer;
          customer['business_id'] = this.props.match.params.b_id;
          if (locs.data.length == 1) {
            customer['location_id'] = locs.data[0]._id;
            this.setState({ customer, singleLocation: true });
          } else {
            this.setState({ singleLocation: false });
          }
        });
      }).catch(err => {
        this.setState({ bigError: true });
      })
    } else {
      this.setState({ bigError: true });
    }
    this.props.getBusiness();
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
    Object.keys(customer).forEach(function (key) {
      if (customer[key] == '' || customer[key] == null) {
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
      customer.username = customer.email;
      if (customer.location_id == 'all') {
        customer['location_id'] = null;
      }
      if (customer.location_id == '') {
        delete customer.location_id;
      }
      this.props.newCustomerAdded(customer, this.state.file, '');
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

  render() {
    const { alert, business, adding } = this.props;
    const { customer, customerError } = this.state;
    const { businessLocation } = business;
    return (
      <div>
        {!this.state.bigError ? <div className="wrapper w-100">
          <div className="row">
            <div className="w-100">
              <div className="row">
                {customerError &&
                  <div className="col-12"><div className={`alert alert-danger fixed-top`}>{customerError}</div></div>
                }
                {alert.message &&
                  <div className="col-12"><div className={`alert ${alert.type} fixed-top`}>{alert.message}</div></div>
                }
              </div>
              <Form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="w-100">
                    <div className="row">
                      <div className="col-xl-12 col-md-12 col-sm-12 col-12 pr-0 pl-0 mt-3 mt-xl-0">
                        <div className="card shadow">
                          <div style={{ background: '#7ac143', color: 'white' }} className="card-header row">
                            <div className="col-12 text-center">
                              <h5 className="">Self Enrollment </h5>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12 text-center">
                                <Image className="pointer" onClick={() => document.getElementById('userImage').click()} id="pimg" style={{ maxWidth: '10em' }} src="https://dummyimage.com/122x122/eee/0011ff.jpg" roundedCircle />
                                <input id="userImage" type="file" onChange={(e) => this.uploadPic(e)} name="myImage" accept="image/*" hidden />
                              </div>
                            </div>
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

                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="phone" placeholder="Enter your phone" value={customer.phone} onChange={this.handleChange} />
                            </Form.Group>

                            {!this.props.match.params.b_id ? <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Business <span className="text-danger">*</span></Form.Label>
                              <Form.Control name="business_id" as="select" value={customer.business_id} onChange={this.handleChange}>
                                <option >Select business</option>
                                {business.items && business.items.length &&
                                  business.items.map((business, index) =>
                                    <option value={business._id}>{business.business_name}</option>
                                  )};
                                              </Form.Control>
                            </Form.Group> : null}

                            {!this.state.singleLocation ? <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                              <Form.Control name="location_id" as="select" value={customer.location_id} onChange={this.handleChange}>
                                <option >Select Location</option>
                                <option value="all">All Locations</option>
                                {businessLocation && businessLocation.length &&
                                  businessLocation.map((business, index) =>
                                    <option value={business._id}>{business.name}</option>
                                  )};
                                              </Form.Control>
                            </Form.Group> : null}
                            <div className="row">
                              {this.state.invalid ?
                                <div className="col-12"><div className={`alert alert-danger`}>Please fill all fields</div></div> : null
                              }
                            </div>
                            <Button variant="primary" className="customBtn w-100" type="submit">
                              Submit
                                    </Button>
                            {adding &&
                              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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
        </div> : <div className="w-100 text-center py-5">
            <h5 className="text-danger">
              Pass correct business id
            </h5>
          </div>}
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
  getBusinessById: businessActions.getBusinessById,
  getBusinessLocations: businessActions.getBusinessLocations
}

const connectedSelfEnrollPage = connect(mapState, actionCreators)(SelfEnrollPage);
export { connectedSelfEnrollPage as SelfEnrollPage };