import React,{Component} from 'react'
import httt from '../service3/htttService3'
class StoreOrder extends Component{

    state={
        orders:[]
    }
 
   async fetchData(url){
    let response=await httt.get(url)
    let {data}=response;
    this.setState({orders:data})
   }
   componentDidMount(){
    this.fetchData('/orders')
   }

    render(){
        let {orders}=this.state
        return(
            <div className='container'>
                
            <div className='row'>
             
             <img className='small' src='https://github.com/edufectcode/react/blob/main/data/MyStore-sale.jpg?raw=true'/>
     
            </div>
            <div className='row mt-2 border bg-secondary'>
                <div className='col-3'> Name </div>
                <div className='col-3'> city </div>
                <div className='col-2'> Address </div>
                <div className='col-2'> Amount </div>
                <div className='col-2'> Items </div>
              
            </div>
            {
                orders.map(elem=>(
                    <div className='row border'>
                <div className='col-3'>{elem.name} </div>
                <div className='col-2'>{elem.city}</div>
                <div className='col-3'>{elem.sector+" "+elem.building} </div>
                <div className='col-2'>{elem.total}</div>
                <div className='col-2'>{elem.items}</div>
              
               </div> 
                ))
            }


            </div>
        )
    }
}
export default StoreOrder