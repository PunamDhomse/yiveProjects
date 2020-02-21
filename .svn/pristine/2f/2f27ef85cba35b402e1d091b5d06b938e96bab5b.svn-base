import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {Sidebar} from '../Sidebar/Sidebar';
import {Header} from '../Header/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddUsersPage extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
          user: {
                  firstname : '',
                  lastname : '',
                  email : '',
                  username : '',
                  password : ''
                },
          submitted: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { user } = this.state;
      //console.log(user);
      this.setState({
          user: {
              ...user,
              [name]: value
          }
      });
  }

  handleSubmit(event) {
      event.preventDefault();

      this.setState({ submitted: true });
      const { user } = this.state;
      if (user.firstname && user.lastname && user.email && user.username && user.password) {
          user.role = 'admin';
          //console.log("user date" ,user);

          this.props.newUser(user);
      }
  }


    render() {
        const { registering, alert  } = this.props;
        const { user, submitted } = this.state;
        return (
          
          <div>
            <Sidebar { ...this.props } />
            <div className="wrapper">
                <Header />
                <div className="users">
                    <div className="container-fluid">
                      <div className="edituser my-3">
                        <div className="container-fluid">
                              <div className="row">
                                  {alert.message &&
                                    <div className="col-12"><div className={`alert ${alert.type}`}>{alert.message}</div></div>
                                  }
                              </div>
                              <div className="row mb-3">
                                <div className="col-6">
                                  <h3>Add New Admin</h3>
                                </div>
                                {/* <div className="col-6 d-flex justify-content-end align-items-center">
                                  <Link to="/users" className=""><i class="fa fa-arrow-circle-left fa-fw"></i></Link>
                                </div> */}
                              </div>
                              <div className="row">
                               <div className="col-12">
                                  <div className="card shadow">
                                     <div className="card-body">
                                      <div className="row">
                                        <div className="col-md-4 col-sm-6 col-12 p-0">
                                          <Form name="form" onSubmit={this.handleSubmit}>
                                          <Form.Group controlId="formBasicFirstName">
                                              <Form.Label>Firstname <span className="text-danger">*</span></Form.Label>
                                              <Form.Control type="text" name="firstname" placeholder="Enter firstname" value={user.firstname} onChange={this.handleChange} />
                                              {submitted && !user.firstname &&
                                              <Form.Text className="text-muted">
                                                Firstname is required
                                              </Form.Text>
                                               }
                                            </Form.Group>
                                            <Form.Group controlId="formBasicLastName">
                                              <Form.Label>Lastname <span className="text-danger">*</span></Form.Label>
                                              <Form.Control type="text" name="lastname" placeholder="Enter lastname" value={user.lastname} onChange={this.handleChange} />
                                              {submitted && !user.lastname &&
                                              <Form.Text className="text-muted">
                                                Lastname is required
                                              </Form.Text>
                                               }
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                              <Form.Control type="email" name="email" placeholder="Enter email" value={user.email} onChange={this.handleChange} />
                                              {submitted && !user.email &&
                                              <Form.Text className="text-muted">
                                                Email is required
                                              </Form.Text>
                                               }
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail">
                                              <Form.Label>User Name <span className="text-danger">*</span></Form.Label>
                                              <Form.Control type="text" name="username" placeholder="Enter username" value={user.username} onChange={this.handleChange} />
                                              {submitted && !user.username &&
                                              <Form.Text className="text-muted">
                                                Username is required
                                              </Form.Text>
                                              }
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword">
                                              <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                                              <Form.Control type="password" name="password" placeholder="Password" value={user.password} onChange={this.handleChange} />
                                              {submitted && !user.password &&
                                              <Form.Text className="text-muted">
                                                Password is required
                                              </Form.Text>
                                              }
                                            </Form.Group>
                                            <Button variant="primary" className="customBtn" type="submit">
                                              Add new user
                                            </Button>
                                            {registering && 
                                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                          </Form>
                                        </div>
                                      </div>
                                     </div>
                                  </div>
                               </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

function mapState(state) {
  const { registering } = state.registration;
  const {alert} = state;
  return { registering, alert };
    
}

const actionCreators = {
  newUser: userActions.newuser
    
}

const connectedAddUsersPage = connect(mapState, actionCreators)(AddUsersPage);
export { connectedAddUsersPage as AddUsersPage };