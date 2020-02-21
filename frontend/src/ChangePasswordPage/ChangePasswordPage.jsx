import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {Sidebar} from '../Sidebar/Sidebar';
import {Header} from '../Header/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class ChangePasswordPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          userPass: {
                  password : '',
                  confirmpassword : '',
                  errorbusinessInfo:''
                },
          submitted: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { userPass } = this.state;
        console.log('userPass',userPass);
        this.setState({
          userPass: {
                ...userPass,
                [name]: value
            }
        });
      }
    
  
      handleSubmit(event) {
          event.preventDefault();
  
          this.setState({ submitted: true });
          const { userPass } = this.state;
          const { user } = this.props;
          if (userPass.password.length > 0 && userPass.confirmpassword.length > 0 && userPass.password === userPass.confirmpassword)
             {
              userPass._id = user._id;
              //console.log(userPass);
              this.props.updateLoggedInPass(userPass);
            }
            else{
              this.setState({errorbusinessInfo:'passwords do not match'})
            }
           
      }

    render() {
      const { userPass, submitted, errorbusinessInfo } = this.state;
      const { user, alert } = this.props;
        return (
        <div>
        	<Sidebar { ...this.props } />
          <div className="wrapper">
              <Header />
              <div className="changepassword my-5">
                  <div className="container-fluid">
                        <div className="row">
                            {errorbusinessInfo &&
                              <div className="col-12 p-0 changePasscode"><div className={`alert alert-danger`}>{errorbusinessInfo}.</div></div>
                            }
                            {alert.message &&
                              <div className="col-12 p-0 changePasscode"><div className={`alert ${alert.type}`}>{alert.message}.</div></div>
                            }
                        </div>
                        <div className="row">
                         <div className="col-12 p-0">
                            <div className="card shadow">
                               <div className="card-header">
                                  <h5 className="">Change Password</h5>
                               </div>
                               <div className="card-body">
                                <div className="row">
                                  <div className="col-md-4 col-sm-6 col-12 p-0">
                                    <Form onSubmit={this.handleSubmit}>
                                      <Form.Group controlId="formBasicPassword">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="New Password" value={userPass.password} onChange={this.handleChange} />
                                      </Form.Group>

                                      <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Re-enter Your New Password</Form.Label>
                                        <Form.Control type="password" name="confirmpassword" placeholder="Re-enter Your New Password" value={userPass.confirmpassword} onChange={this.handleChange} />
                                      </Form.Group>

                                      <Button variant="primary" className="customBtn" type="submit">
                                        Change Password
                                      </Button>
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
        );
    }
}

function mapState(state) {
  const { authentication, alert } = state;
  const { user } = authentication;
  //console.log(user);
  return { user, alert };
}

const actionCreators = {
  updateLoggedInPass: userActions.updateLoggedInPass
    
}

const connectedChangePasswordPage = connect(mapState, actionCreators)(ChangePasswordPage);
export { connectedChangePasswordPage as ChangePasswordPage };