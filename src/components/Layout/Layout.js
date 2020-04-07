import React,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxi/Auxi'
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


class Layout extends Component{
    state={
        showMenu: false
    }
    showMenuHandler = () =>{
        this.setState({showMenu:true})
    }
    removeMenuHandler = () =>{
        this.setState({showMenu:false})
    }
    render(){
        let isAuth = this.props.isAuth != null;
        return(
            <Aux>
            <SideDrawer isAuth={isAuth} show={this.state.showMenu}
            removeMenu={this.removeMenuHandler}/>
            <Toolbar isAuth={isAuth} clicked={this.showMenuHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Aux>);
    }
}
const mapStateToProps = state =>{
    return{
        isAuth: state.auth.token
    }
}
export default connect(mapStateToProps)(Layout);