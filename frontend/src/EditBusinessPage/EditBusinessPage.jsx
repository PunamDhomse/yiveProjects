import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { businessActions, userActions, commonActions } from '../_actions';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import Form from 'react-bootstrap/Form';
import EditLocation from './editLocation';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


class EditBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateBusiness: {
        firstname: '',
        lastname: '',
        email: '',
        business_name: '',
        password: ''
      },
      businessLocation: [{
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalcode: "",
        status: true,
        temp: true
      }],
      submitted: false,
      invalid: false,
      mail: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillMount() {
    const businessId = this.props.match.params.business_id;
    this.props.getBusinessById(businessId).then(business => {
      business.data.userData[0]['business_name'] = business.data.business_name;
      let Business = business.data.userData[0];
      Business['password'] = '';
      this.setState({ businessLocation: business.data.businessLocations, stateBusiness: Business });
    });
    this.props.businessUserList();
    this.props.countriesList();
  }

  addLocation = (e) => {
    this.setState((prevState) => ({
      businessLocation: [...prevState.businessLocation, { name: "", city: "", state: "", country: "", address: "", postalcode: "", temp: true, status: true }],
    }));
  }

  removeLocation = (e) => {
    const locationId = e.target.dataset.id;
    let businessLocation = [...this.state.businessLocation];
    if (businessLocation[locationId].temp) {
      businessLocation.splice(locationId, 1);
    } else {
      businessLocation[locationId].status = false;
    }
    this.setState({ businessLocation });
  }

  ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { stateBusiness } = this.state;
    if (["name", "address", "city", "country", "state", "postalcode"].includes(event.target.dataset.fieldname)) {
      let businessLocation = [...this.state.businessLocation];
      if (name == 'country-' + event.target.dataset.id) {
        this.props.regionsList(value);
      }
      businessLocation[event.target.dataset.id][event.target.dataset.fieldname] = event.target.value;
      this.setState({ businessLocation });

    } else {
      if (name == 'email') {
        this.ValidateEmail(value) ? this.setState({ mail: true }) : this.setState({ mail: false });
      }
      this.setState({
        stateBusiness: {
          ...stateBusiness,
          [name]: value
        }
      });
    }
  }

  checklocations = () => {
    let result = true;
    this.state.businessLocation.forEach((loc) => {
      Object.keys(loc).forEach(function (key) {
        if (loc[key] == '' && loc['status'] && ["name", "address", "city", "country", "state", "postalcode"].includes(key)) {
          result = false;
        }
      });
    });
    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true, invalid: false });
    const { stateBusiness, businessLocation } = this.state;
    let business = {};
    business['_id'] = this.props.match.params.business_id;
    //stateBusiness.business_name !== '' && stateBusiness.firstname !== '' && stateBusiness.lastname !== '' && 
    if (stateBusiness.email !== '' && this.checklocations() && this.state.mail) {
      business['business_name'] = stateBusiness.business_name;
      if (stateBusiness.password == '') {
        delete stateBusiness.password;
      }
      this.props.updateBusinessAndLocation(business, businessLocation, stateBusiness);
    } else {
      this.setState({ invalid: true });
    }
  }



  render() {
    const { businessInfo, alert, users, updating, countries, regions, authentication } = this.props;
    const businessLocation = this.state.businessLocation;
    const { stateBusiness, submitted, errorbusinessUpdate } = this.state;
    let { user } = authentication;
    return (
      <div>
        <Sidebar {...this.props} />
        <div className="wrapper">
          <Header />
          <div className="editbusiness my-4">
            <div className="container-fluid">
              <div className="row">
                {errorbusinessUpdate &&
                  <div className="col-12"><div className={`alert alert-danger`}>{errorbusinessUpdate}</div></div>
                }
                {alert.message &&
                  <div className="col-12"><div className={`alert ${alert.type}`}>{alert.message}</div></div>
                }
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <h3>Edit Business Details</h3>
                 </div>
                 {/* <div className="col-6 d-flex justify-content-end align-items-center">
                  <Link to="/business" className=""><i class="fa fa-arrow-circle-left fa-fw"></i></Link>
                </div>  */}
              </div>
              <Form onSubmit={this.handleSubmit}>
                {user && user.role !== 'businessOwner' ? <div className="row">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">

                        <div className="row">
                          <div className="col-md-6 col-sm-6 col-12 pl-0 pl-sm-3 pr-0">
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Owner First Name </Form.Label>
                              <Form.Control type="text" name="firstname" value={stateBusiness.firstname} onChange={this.handleChange} placeholder="Enter owner first name" />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </div>
                          <div className="col-md-6 col-sm-6 col-12 pl-0 pl-sm-3 pr-0">
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Owner Last Name </Form.Label>
                              <Form.Control type="text" name="lastname" value={stateBusiness.lastname} onChange={this.handleChange} placeholder="Enter owner last name" />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </div>
                          {/*<div className="col-md-6 col-sm-6 col-12 pl-0 pl-sm-3 pr-0">
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Owner Email <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="text" name="email" value={stateBusiness.email} onChange={this.handleChange} placeholder="Enter owner email" />
                              {!this.state.mail ? <span style={{ color: 'red', fontSize: '12px' }}>Please enter a valid email</span> : null}
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </div>
                          <div className="col-6">
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                              <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>

                          </div>*/} 
                        </div>
                      </div>
                    </div>
                  </div>
                </div> : null} {/* FIRST ROW*/}
                <div className="row my-3">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 col-sm-7 col-12 pl-0">
                            <h3>Business</h3>
                          </div>
                          <div className="col-md-12 col-sm-12 col-12 pl-0 pl-sm-3 pr-0">
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Business name </Form.Label>
                              <Form.Control type="text" name="business_name" onChange={this.handleChange} placeholder="Enter business name" value={stateBusiness.business_name} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-8 col-sm-8 col-8 pl-0">
                            <h3>Business locations (Total: {businessLocation ? businessLocation.length : '0'})</h3>
                          </div>
                          <div className="col-md-4 col-sm-4 col-4 pr-0">
                            <button type="button" class="customBtn btn pull-right btn-primary" onClick={this.addLocation}>Add more locations</button>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-12 col-sm-12 col-12">
                              <Accordion defaultActiveKey="0">
                              {
                                businessLocation.map((val, idx) => {
                                  return (<Card bg="light">
                                    <Card.Header style={{backgroundColor:'white'}}>
                                      <Accordion.Toggle as={Button} variant="link" eventKey={idx} text="primary" >
                                        {businessLocation[idx].name.toUpperCase()}
                                      </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={idx}>
                                      <Card.Body>
                                        <EditLocation
                                          {...this.props}
                                          idx={idx}
                                          val={val}
                                          countries={countries}
                                          regions={regions}
                                          handleChange={this.handleChange}
                                          removeLocation={this.removeLocation}
                                          businessLocation={businessLocation}
                                        />
                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </Card>
                                  )
                                })
                              }
                              </Accordion>
                          </div>
                        </div>
                        {
                          /*businessLocation.map((val, idx) => {
                            return (
                              <EditLocation
                                {...this.props}
                                idx={idx}
                                val={val}
                                countries={countries}
                                regions={regions}
                                handleChange={this.handleChange}
                                removeLocation={this.removeLocation}
                                businessLocation={businessLocation}
                              />
                            )
                          })*/
                        }

                        <div className="row">
                          <div className="col-12 p-0 d-flex flex-wrap justify-content-start border-top pt-3">
                            <Button variant="primary" className="customBtn float-right" type="submit">
                              Update business
                              {updating &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                              }
                            </Button>

                          </div>
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
  //console.log("state full---------", state);
  const { businessInfo } = state.business;
  const { alert, users, updating, common, authentication } = state;
  const { countries, regions } = state.common;
  return { businessInfo, alert, users, updating, countries, regions, authentication };

}

const actionCreators = {
  getBusinessById: businessActions.getBusinessById,
  businessUserList: userActions.getAll,
  countriesList: commonActions.getCountries,
  regionsList: commonActions.getRegions,
  updateBusinessAndLocation: businessActions.updateBusinessAndLocation,
  returnCountries: commonActions.returnCountries,
  returnRegions: commonActions.returnRegions
}

const connectedEditBusinessPage = connect(mapState, actionCreators)(EditBusinessPage);
export { connectedEditBusinessPage as EditBusinessPage };