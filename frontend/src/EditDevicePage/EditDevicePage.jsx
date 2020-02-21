import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { businessActions, deviceActions } from '../_actions';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class EditDevicePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        business_id: null,
        name: '',
        serial: '',
        area: '',
        communicationtype: '',
        password: '',
        connectionmode: '',
        ipaddress: '',
        parameter: '',
        model: '',
        version: '',
        activitystatus: ''
      },
      submitted: false,
      invalid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let deviceId = this.props.match.params.device_id;
    this.props.getDeviceById(deviceId).then(device => {
      this.setState({ customer: device.data });
    });
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


  handleChange(event) {
    const { name, value } = event.target;
    const { customer } = this.state;
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
      let status = ['parameter', '__v', 'status'].includes(key);
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
    if (this.checkCustomer()) {
      this.props.newCustomerAdded(customer);
    }
    else {
      this.setState({ invalid: true });
    }
  }


  render() {
    const { alert, business, adding } = this.props;
    const { user } = this.props.authentication;
    const { customer, customerError } = this.state;
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
                {user && user.role == 'admin' ? <div className="row mb-3">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 col-sm-6 col-12 p-0">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Select Business {user && user.role === 'admin' ? null : <span className="text-danger">*</span>}</Form.Label>
                              <Form.Control name="business_id" as="select" value={customer.business_id} onChange={this.handleChange}>
                                <option >Select business</option>
                                {business.items && business.items.length &&
                                  business.items.map((business, index) =>
                                    <option value={business._id}>{business.business_name}</option>
                                  )};
                                              </Form.Control>
                            </Form.Group>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div> : null}
     
                    <div className="row">
                      <div className="col-12">
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
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label>Communication Password <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="password" name="password" placeholder="Communication Password" value={customer.password} onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </div>
                            <div className="col-sm-6 col-12">
                              <Form.Group controlId="formBasicPassword">
                                <Form.Label>RS485 Parameter </Form.Label>
                                <Form.Control type="text" name="parameter" placeholder="RS485 Parameter" value={customer.parameter} onChange={this.handleChange} />
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
                          </div>
                          <div className="row card-body">
                            <div className="col-6">
                              <Button variant="primary" className="customBtn" type="submit">
                                Update Device
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
  newCustomerAdded: deviceActions.updateDevice,
  getDeviceById: deviceActions.getDeviceById,
  getBusiness: businessActions.getAllBusiness
}

const connectedEditDevicePage = connect(mapState, actionCreators)(EditDevicePage);
export { connectedEditDevicePage as EditDevicePage };