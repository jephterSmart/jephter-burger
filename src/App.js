import React, {Component} from 'react';
import {Route,withRouter, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './components/Layout/Layout';
import Aux from './hoc/Auxi/Auxi'
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Logout from './container/Auth/Logout/Logout'
import * as actions from './store/actions/index';

const aysncCheckout = asyncComponent(() => import('./container/Checkout/Checkout'))
const aysncOrder = asyncComponent(() => import('./container/Orders/Orders'))
const aysncAuthentication = asyncComponent(() => import('./container/Auth/Auth'))
class App extends Component{
  componentDidMount(){
    this.props.onCheckAuthenticationState();
  }
  
  render(){
    let routes = (
        <Aux>
          <Switch>
          <Route path= '/auth' component = {aysncAuthentication}/>
           <Route path='/' exact component={BurgerBuilder} />
           <Redirect to='/' />
          </Switch>
          
        </Aux>
    )
    if(this.props.isAuthenticated){
      routes=(
        <Aux>
          <Switch>
          <Route path= '/auth' component = {aysncAuthentication}/>
          <Route path = '/checkout' component={aysncCheckout} />
          <Route path= '/order' component = {aysncOrder}/>
          <Route path= '/logout' component = {Logout}/>
           <Route path='/' exact component={BurgerBuilder} />
           <Redirect to= '/' />
          </Switch>
          
        </Aux>
      )
    }
    return(
     
        <Layout>
         {routes}

        </Layout>
  
      
    );
  }
}
const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token != null,
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onCheckAuthenticationState: () => dispatch(actions.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
