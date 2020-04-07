import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css'
import * as actions from '../../store/actions/index';


class Auth extends Component {

    state = {
        controls:{
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                touched: false,
                valid: false
            },
            password:{
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required:true,
                    minLength: 6
                },
                touched: false,
                valid:false
            }
        },
        isValid: false,
        isSignUp: true
    }
    checkValidity(value,rules){
        let isValid = true
        if(rules){
            if(rules.required){
                isValid = isValid && value.trim() !== '';
        }
            if(rules.maxLength){
                isValid = isValid && value.length <= rules.maxLength;
            }
            if(rules.minLength){
                isValid = isValid && value.length >= rules.minLength;
        }
            if(rules.isEmail){
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)/
                isValid = pattern.test(value) && isValid
            }
        }
        
    return isValid;
    }
    inputChangeHandler = (event,controlName) =>{
        let updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation)
            }
        }

        let formIsValid = true;
    for(let key in updatedControls){
        formIsValid = formIsValid && updatedControls[key].valid ? updatedControls[key].valid : false
    }
    this.setState({controls:updatedControls,isValid:formIsValid});
    }
    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuthentication(this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp);
    }
    switchModeHandler = () =>{
        this.setState(prevState => {
            return{
                isSignUp: !prevState.isSignUp
            }
        })
    }
componentDidMount () {
    
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/')
       this.props.onSetAuthRedirectPath();
}
render(){
    let authenticatedPath = null;
    
    if(this.props.isAuthenticated)
        authenticatedPath = <Redirect to={this.props.authRedirectPath} />
    let formElementsArray = [];
    for(let key in this.state.controls){
        formElementsArray.push({
            id:key,
            config: this.state.controls[key]
        })
    }
    let form  = (
        <form onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => <Input key={formElement.id} 
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event)=> this.inputChangeHandler(event,formElement.id)}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}/>)}
        <Button btnType='Success' disabled={!this.state.isValid || this.props.loading} >SUBMIT</Button>
        </form>
        )	
    if(this.props.loading)
            form = <Spinner />
    let errorMessage = '';
    if(this.props.error){
        errorMessage =( <p 
        style={{fontSize: '14px',color:'red',textTransform: 'capitalize'}}>*{this.props.error.message}</p>)
    }
    return (
        <div className={classes.Auth}> 
        {authenticatedPath}
        {errorMessage}
            {form}   
    <Button btnType='Danger' disabled={this.props.loading} clicked={this.switchModeHandler}>
        Switch To {this.state.isSignUp? 'SIGN IN' : 'SIGN UP'}
    </Button>
        </div>);
    }
}
const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burger.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onAuthentication: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);