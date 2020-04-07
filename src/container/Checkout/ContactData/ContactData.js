import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-burger-instance';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';


class ContactData extends Component {
   
    customerHelper = (field,options) =>{
        let elementObj = null;
        switch(field){
            case ('street'): 
                elementObj ={
                    elementType: 'input',
                    elementConfig:{...options.elementConfig,
                    type: 'text'},
                    value: options.value,
                    valid:false,
                    validation:{required: true,
                                minLength: 3 , touched:false,}
                }
                break;
                case ( 'country'): 
                elementObj ={
                    elementType: 'input',
                    elementConfig:{...options.elementConfig,
                    type: 'text'},
                    value: options.value,
                    valid:false,
                    validation:{required: true,
                                minLength:  3 , touched:false,}
                }
                break;
                case (  'zipcode' ): 
                elementObj ={
                    elementType: 'input',
                    elementConfig:{...options.elementConfig,
                    type:'text'},
                    value: options.value,
                    valid:false,
                    validation:{required: true, maxLength:  5,
                                minLength:5 , touched:false,}
                }
                break;
                case ( 'email'): 
                elementObj ={
                    elementType: 'input',
                    elementConfig:{...options.elementConfig,
                    type:'email'},
                    value: options.value,
                    valid:false,
                    validation:{required: true, 
                                minLength: 3 , touched:false,}
                }
                break;
                case ('name'): 
                elementObj ={
                    elementType: 'input',
                    elementConfig:{...options.elementConfig,
                    type:'text'},
                    value: options.value,
                    valid:false,
                    validation:{required: true, 
                                minLength:3 , touched:false,}
                }
                break;
            case 'delivery':
                    elementObj ={
                        elementType: 'select',
                        elementConfig:{...options.elementConfig},
                        value: options.value,
                        valid: true
                    }
                    break;
        //     default: elementObj = {
        //         elementType: 'input',
        //         elementConfig:{...options.elementConfig},
        //         value: options.value,
        //         valid:false,
        //         validation:{required: true, maxLength: field === 'zipcode'? 5 : undefined,
        //                     minLength: field === 'zipcode'? 5 : undefined , touched:false,}
        //     };
        }
        
        return elementObj;
    }
    state ={
        customerInfo:{
                name: this.customerHelper('name',{value:'',elementConfig:{placeholder:'Your Name'}}),
                zipCode: this.customerHelper('zipcode',{value:'',elementConfig:{placeholder:'ZIP Code'}}),
                country: this.customerHelper('country',{value:'',elementConfig:{placeholder:'Country'}}),
                street: this.customerHelper('street',{value:'',elementConfig:{placeholder:'Street'}}), 
                email: this.customerHelper('email',{value:'',elementConfig:{placeholder:'Your E-Mail'}}),
                deliveryMethod: this.customerHelper('delivery',{value:'fastest',
                elementConfig:{options:[{value:'fastest',displayValue:'Fastest'},
                {value:'cheapest',displayValue:'Cheapest'}]}}),
        },
        isValid: false
        
    }
    
    orderHandler = (event) =>{
        event.preventDefault()
      const order ={
          ingredients: this.props.ingredients,
          total: this.props.totalPrice,
          customerInfo:{
            name: this.state.customerInfo.name.value,
            address:{
              zipCode:  this.state.customerInfo.zipCode.value,
            country:  this.state.customerInfo.country.value,
            street:  this.state.customerInfo.street.value
            },
            email:  this.state.customerInfo.email.value
        },
        userId: this.props.userId,
        deliveryMethod:  this.state.customerInfo.deliveryMethod.value
    }
    this.props.onburgerPurchase(order)
      
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
    }
    
return isValid;
}
inputChangeHandler = (event, identifier) =>{
    let updatedCustomerInfo ={...this.state.customerInfo}
    let updatedField = {...updatedCustomerInfo[identifier]};
    updatedField.value = event.target.value;
    updatedField.valid = this.checkValidity(updatedField.value, updatedField.validation)
    updatedField.touched = true;
    updatedCustomerInfo[identifier] = updatedField;
    
    let formIsValid = true;
    for(let key in updatedCustomerInfo){
        formIsValid = formIsValid && updatedCustomerInfo[key].valid ? updatedCustomerInfo[key].valid : false
    }
    this.setState({customerInfo:updatedCustomerInfo,isValid:formIsValid})
    
    
}
render(){
    let formElementsArray = [];
    for(let key in this.state.customerInfo){
        formElementsArray.push({
            id:key,
            config: this.state.customerInfo[key]
        })
    }
    let form  = (
        <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => <Input key={formElement.id} 
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event)=> this.inputChangeHandler(event,formElement.id)}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}/>)}
        <Button btnType='Success' disabled={!this.state.isValid} >Order Now</Button>
        </form>
    )	
    if(this.props.loading){
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}> 
           <h2>Enter Your Contact Data</h2>
           {form}
    
        </div>);
    }
}
const mapStateToprops = state =>{
    return{
        loading: state.order.loading,
        userId: state.auth.userId,
        ingredients: state.burger.ingredients,
        totalPrice:state.burger.totalPrice
    }
}
const mapDispatchToprops = dispatch =>{
    return{
    onburgerPurchase: (orderInfo) => {dispatch(actions.burgerPurchase(orderInfo))}
    }
}
export default connect(mapStateToprops,mapDispatchToprops)(withErrorHandler(ContactData,axios)); 