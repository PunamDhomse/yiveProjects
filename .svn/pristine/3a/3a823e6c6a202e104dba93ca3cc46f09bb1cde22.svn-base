import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../custom.css';
import { userActions } from '../_actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            console.log("HIIIIIIIIIIIIIIIIIIII" +username);
            console.log("YYYYYYYYYYYYYYYYYYYYY"+password);
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn, alert } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="customWidth bg-white shadow p-0 rounded-sm">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <div className="logo text-center py-3 title">
                    <a href="#">
                        <Image src="data:image/png;base64,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" />
                    </a>
                </div>
                <div className="row">
                    <div className="col-12 px-4 pb-4">
                        <h3 className="text-center py-3 text-uppercase mb-0">Sign In</h3>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                <label htmlFor="username">Username / Email</label>
                                <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                {submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-6 pl-0 rememberPwd">
                                        <Form.Group controlId="formBasicCheckbox" className="mb-0">
                                            <Form.Check type="checkbox" label="Remember Me" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-6 pr-0 text-right forget_pwd">
                                        <Link to="/forgotpassword" className="btn btn-link p-0">Forgot Password?</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <button className="btn btn-primary btn-block customBtn">Sign In</button>
                                {loggingIn &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                        </form>
                        <div className="row">
                            <div className="col-12 pt-3">
                                {/* <Link to="/register" className="btn btn-link">Dont have an account yet? Sign Up</Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return { loggingIn, alert };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };