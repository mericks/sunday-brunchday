import React, { Component } from 'react';
import SingleInput from './formComponents/SingleInput';
import authService from '../../services/auth-service';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
        this.handleFormSignUp = this.handleFormSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleFormSignUp(e) {
        e.preventDefault();

        const formPayload = {
            name: { first: this.state.firstName, last: this.state.lastName },
            email: this.state.email,
            password: this.state.password
        };

        authService.signup(formPayload)
        .then(() => this.props.handleSignIn())
        .then(()=> this.props.history.push('/dashboard'))
        .catch(err => console.log(err));
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <h1>Sign Up and Get Ready to Brunch!</h1>
                <form onSubmit={this.handleFormSignUp}>
                    <SingleInput
                        title={'First Name'}
                        name={'firstName'}
                        inputType={'text'}
                        content={this.state.firstName}
                        controlFunc={this.handleChange}
                        placeholder={'First Name'} />
                    <SingleInput
                        title={'Last Name'}
                        name={'lastName'}
                        inputType={'text'}
                        content={this.state.lastName}
                        controlFunc={this.handleChange}
                        placeholder={'Last Name'} />
                    <SingleInput
                        title={'Email'}
                        name={'email'}
                        inputType={'text'}
                        content={this.state.email}
                        controlFunc={this.handleChange}
                        placeholder={'Email'} />
                    <SingleInput 
                        title={'Password'}
                        name={'password'}
                        inputType={'text'}
                        content={this.state.password}
                        controlFunc={this.handleChange}
                        placeholder={'Password'} />
                    <input
                        type='submit'
                        value='Submit' />
                </form>
            </div>
        );
    };

}

export default SignUpForm;
