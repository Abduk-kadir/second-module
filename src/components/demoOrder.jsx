import React,{Component} from 'react'
import http from '../service5/httpService5'
class DemoOrder extends Component{
    state={}
    
    async getOrder(){
        let {type}=this.props.match.params
        let url=type=='my'?'/myorders':'/allorders'
        try{
           let response=await http.get(url)
           let {data}=response;
           this.setState({orders:data,errMsg:null})
        }
        catch(ex){
            let errMsg=`${ex.response.status} ${ex.response.statusText}`
            this.setState({orders:[],errMsg:errMsg})

        }

    }
    componentDidMount(){
        this.getOrder()
    }
    componentDidUpdate(prevprops,prevstate){

        if(prevprops!=this.props){
            this.getOrder()
        }
    }

    render(){
        let {orders,errMsg}=this.state
        return (
            <div className='container'>
            <h4>Welcome to Order Page</h4>
            {
                errMsg&&<h4>{errMsg}</h4>
            }
            {
                orders&&orders.map(elem=>(
                    <div className='row'>
                        <div className='col-3'>{elem.orderId}</div>
                        <div className='col-3'>{elem.userId}</div>
                        <div className='col-3'>{elem.qty}</div>
                        <div className='col-3'>{elem.value}</div>
                    </div>
                ))

            }
           
            </div>
        )
    }
}
export default DemoOrder