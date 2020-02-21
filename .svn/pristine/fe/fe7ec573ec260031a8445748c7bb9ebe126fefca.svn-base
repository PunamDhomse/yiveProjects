import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { userActions } from '../_actions';

class ForgotPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: ''
            },
            submitted: false,
            success: false,
            danger: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.success === true) {
            this.setState({ submitted: false });
            this.setState({
                user: {
                    email: ''
                }
            });
        }
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true, success: false, danger: false });
        const { user } = this.state;
        if (user.email) {
            this.props.forgotpassword(user).then(() => {
                this.setState({ success: true });
            }).catch(() => {
                this.setState({ danger: true });
            });
        }
    }

    render() {
        const { emailing, success } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="customWidth bg-white shadow p-0 rounded-sm">
                <div className="logo text-center py-3 title">
                    <a href="#">
                        <Image src="./assets/img/yive.png" />
                    </a>
                </div>
                <div className="row">
                    <div className="col-12 px-4 pb-4">
                        <h3 className="text-center py-3 text-uppercase mb-0">Forget Password</h3>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                                {submitted && !user.email &&
                                    <div className="help-block">Email is required</div>
                                }
                            </div>
                            <div className="form-group mb-0">
                                <button className="btn btn-primary btn-block customBtn">Submit</button>
                                {emailing &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                        </form>
                        {this.state.danger ? <span className="text-danger">Email not exist.</span> : null}
                        {this.state.success ? <span className="text-success">Email sent successfully.</span> : null}
                        <div className="row">
                            <div className="col-12 text-center">
                                <Link to="/login" className="btn btn-link">Back to Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { emailing, success } = state.forgotpassword;
    return { emailing, success };
}

const actionCreators = {
    forgotpassword: userActions.forgotpassword
}

const connectedForgotPasswordPage = connect(mapState, actionCreators)(ForgotPasswordPage);
export { connectedForgotPasswordPage as ForgotPasswordPage };
