import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { businessActions, userActions, deviceActions, commonActions } from '../_actions';
import { Sidebar } from '../Sidebar/Sidebar';
import Autocomplete from 'react-autocomplete';
import { Header } from '../Header/Header';
import { Modal } from 'react-bootstrap';
import Webcam from "react-webcam";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import NumberFormat from 'react-number-format';

class AddDevicePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        business_id: null,
        name: '',
        serial: '',
        password: '',
        area: '',
        communicationtype: '',
        connectionmode: '',
        ipaddress: '',
        parameter: '',
        model: '',
        version: '',
        activitystatus: 'online'
      },
      submitted: false,
      autoValue: '',
      invalid: false,
      nextForm: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { user } = this.props.authentication;
    const authUser = user;
    if (authUser && authUser.role == 'businessOwner') {
      this.props.getBusiness(authUser._id);
    } else {
      this.props.getBusiness();
    }
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    const { customer } = this.state;
    this.setState({
      customer: {
        ...customer,
        [name]: value
      }
    });
  }

  checkCustomer = (props) => {
    let result = true;
    let customer = this.state.customer;
    const { user } = props.authentication;
    Object.keys(customer).forEach(function (key) {
      let status = ['parameter'].includes(key);
      if (user.role == 'businessOwner' && key == 'business_id') {
        customer[key] = props.business.items[0]._id;
      }
      if ((customer[key] == '' || customer[key] == null) && !status) {
        result = false;
      }
    });
    return result;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true, invalid: false });
    const { customer } = this.state;
    if (this.checkCustomer(this.props)) {
      this.props.newCustomerAdded(customer);
    }
    else {
      this.setState({ invalid: true });
    }
  }

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
    const { alert, business, adding } = this.props;
    const { user } = this.props.authentication;
    const { customer, customerError } = this.state;
    let autoComplete = [];
    if (business.items && business.items.length) {
      autoComplete = business.items.map(elem => {
        return { label: elem.business_name, _id: elem._id }
      });
    }
    return (
      <div>
        <Sidebar {...this.props} />
        <div className="wrapper">
          <Header />
          <div className="row my-5">
            <div className="container-fluid">
              <div className="row">
                {customerError &&
                  <div className="col-12"><div className={`alert alert-danger`}>{customerError}</div></div>
                }
                {alert.message &&
                  <div className="col-12"><div className={`alert ${alert.type}`}>{alert.message}</div></div>
                }
              </div>
              <div className="row mb-3">
                <div className="col-9">
                  <h3>Add New Device</h3>
                </div>
                {/* <div className="col-3 d-flex justify-content-end align-items-center">
                  <Link to="/devices" className=""><i className="fa fa-arrow-circle-left fa-fw"></i></Link>
                </div> */}
              </div>
              <Form onSubmit={this.handleSubmit}>
                {user && user.role == 'admin' ? <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 col-sm-6 col-12 p-0 pb-3">
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
                              <Form.Label>Select Business {user && user.role === 'admin' ? null : <span className="text-danger">*</span>}</Form.Label>
                              <Form.Control name="business_id" as="select" value={customer.business_id} onChange={this.handleChange}>
                                <option >Select business</option>
                                {business.items && business.items.length &&
                                  business.items.map((business, index) =>
                                    <option value={business._id}>{business.business_name}</option>
                                  )};
                                
                              </Form.Control>
                            </Form.Group> */}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div> : null}
                <div className="row my-3">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card shadow">
                          <div className="card-header">
                            <h5 className="">Device</h5>
                          </div>
                          <div className="row card-body">
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label>Device Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" name="name" placeholder="Enter Device Name" value={customer.name} onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label>Communication Type <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" name="communicationtype" placeholder="Enter Communication Type" value={customer.communicationtype} onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label>IP Address <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" name="ipaddress" placeholder="Enter IP Address" value={customer.ipaddress} onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label>Communication Password <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="password" name="password" placeholder="Communication Password" value={customer.password} onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label>Area Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" name="area" placeholder="Enter Area Name" value={customer.area} onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Network Connection Mode <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" name="connectionmode" placeholder="Network Connection Mode" value={customer.connectionmode} onChange={this.handleChange} />
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Device Model <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" name="model" placeholder="Device Model" value={customer.model} onChange={this.handleChange} />
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Serial Number <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" name="serial" placeholder="Serial Number" value={customer.serial} onChange={this.handleChange} />
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>Firmware Version <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" name="version" placeholder="Firmware Version" value={customer.version} onChange={this.handleChange} />
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Status</Form.Label>
                                <Form.Control name="activitystatus" as="select" value={customer.activitystatus} onChange={this.handleChange}>
                                  <option value="online">Online</option>
                                  <option value="disable">Disable</option>
                                  <option value="offline">Offline</option>
                                </Form.Control>
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>RS485 Parameter </Form.Label>
                                <Form.Control type="text" name="parameter" placeholder="RS485 Parameter" value={customer.parameter} onChange={this.handleChange} />
                              </Form.Group>
                            </div>
                          </div>
                          <div className="row card-body">
                            <div className="col-6">
                              <Button variant="primary" className="customBtn" type="submit">
                                Add New Device
                                    </Button>
                              {adding &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                              }
                            </div>
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
  const { alert, business, adding, authentication } = state;
  return { alert, business, adding, authentication };
}

const actionCreators = {
  newCustomerAdded: deviceActions.addNewDevice,
  getBusiness: businessActions.getAllBusiness
}

const connectedAddDevicePage = connect(mapState, actionCreators)(AddDevicePage);
export { connectedAddDevicePage as AddDevicePage };