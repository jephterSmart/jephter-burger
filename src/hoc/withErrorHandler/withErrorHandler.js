import React,{Component} from 'react'

import Aux from '../Auxi/Auxi';
import Modal from '../../components/UI/Modal/Modal'
function withErrorHandler(WrappedComponent,axios){
    return class extends Component{
        state={
            error: null
        }
        modalCloseHandler = () =>{
            this.setState({error:null})
        }
        componentWillMount(){
           this.resInterceptor = axios.interceptors.response.use(res => res, err =>{
                this.setState({error:err});
                return Promise.reject(err)
            })
           this.reqinterceptors = axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req;
            },err =>{
                this.setState({error:err})
            })
        }
        componentWillUnmount(){
            axios.interceptors.response.eject(this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);

        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error}
                    removeBackdrop={this.modalCloseHandler}>
                       {this.state.error? this.state.error.message : null} 
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )

        }
    }

}
export default withErrorHandler;