import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {Sidebar} from '../Sidebar/Sidebar';
import {Header} from '../Header/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class EditUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          stateUser: {
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

    
    componentDidMount() {
      const userId = this.props.match.params.user_id;
      this.props.getById(userId);
   }

   handleChange(event) {
    const { name, value } = event.target;
    const { stateUser } = this.state;
    //console.log('stateUser',stateUser);
    this.setState({
        stateUser: {
            ...stateUser,
            [name]: value
        }
    });
    }

    
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { stateUser } = this.state;
        //console.log('submitting stateuser', stateUser);
        if (stateUser.firstname || stateUser.lastname || stateUser.email || stateUser.username || stateUser.password) {
          stateUser._id = this.props.match.params.user_id;
          this.props.updateUser(stateUser);
        }
    }

    render() {
      const { user, alert } = this.props;
      const { stateUser, submitted } = this.state;
        return (
        <div>
        	<Sidebar { ...this.props } />
          <div className="wrapper">
              <Header />
              {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
              <div className="edituser my-4">
                  <div className="container-fluid">
                        <div className="row mb-3">
                          <div className="col-6">
                            <h3>Edit User Details</h3>
                          </div>
                          {/* <div className="col-6 d-flex justify-content-end align-items-center">
                            <Link to="/users" className=""><i className="fa fa-arrow-circle-left fa-fw"></i></Link>
                          </div> */}
                        </div>
                        <div className="row">
                         <div className="col-12">
                            <div className="card shadow">
                               <div className="card-body">
                                <div className="row">
                                  <div className="col-md-4 col-sm-6 col-12 p-0">
                                    <Form onSubmit={this.handleSubmit} >
                                      <Form.Group controlId="formBasicFirstName">
                                        <Form.Label>Firstname <span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" name="firstname" placeholder="Enter firstname" value={(user && !stateUser.firstname) ? user.firstname : stateUser.firstname } onChange={this.handleChange} />
                                      </Form.Group>
                                      <Form.Group controlId="formBasicLastName">
                                        <Form.Label>Lastname <span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" name="lastname" placeholder="Enter lastname" value={(user && !stateUser.lastname) ? user.lastname : stateUser.lastname } onChange={this.handleChange} />
                                      </Form.Group>
                                      <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Enter email" value={(user && !stateUser.email) ? user.email : stateUser.email } onChange={this.handleChange} />
                                      </Form.Group>
                                      <Form.Group controlId="formBasicEmail">
                                        <Form.Label>User Name <span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" name="username" placeholder="Enter username"  value={(user && !stateUser.username) ? user.username : stateUser.username } onChange={this.handleChange}/>
                                      </Form.Group>

                                      <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Password" value={stateUser.password} onChange={this.handleChange} />
                                      </Form.Group>
                                      <Button variant="primary" className="customBtn" type="submit">
                                        Update
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
  const {user} = state.users;
  const {alert} = state;
  return {user, alert};
}

const actionCreators = {
  getById: userActions.getById,
  updateUser: userActions.updateUser
}

const connectedEditUserPage = connect(mapState, actionCreators)(EditUserPage);
export { connectedEditUserPage as EditUserPage };