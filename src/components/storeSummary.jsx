import React,{Component} from 'react'
import auth from '../service3/authService3'
import httt from '../service3/htttService3'
class StoreSummary extends Component{
    state={
        user:{name:'',building:'',sector:'',city:''}
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e
        let s1={...this.state}
        s1.user[input.name]=input.value
        this.setState(s1)
    }
    async postData(url,obj){
        let response=await httt.post(url,obj)
        auth.removeCart()
        this.props.history.push('/successfull')
    }
    handleSubmit=()=>{
        
        let arr=auth.getCart()
        let user=auth.getUser()
        let email=user.email
        let items=arr.length
        let total=arr.reduce((acc,curr)=>acc+curr.quantity*curr.price,0)
        let newuser={...this.state.user,email:email,items:items,total:total}
        console.log(newuser)
        this.postData('/orders',newuser)

    }
    render(){
        let arr=auth.getCart()
        let val=arr.reduce((acc,curr)=>acc+curr.quantity*curr.price,0)
        let {name,building,sector,city}=this.state.user
        return(
            <div className="container ">
                  <div className='row'>
             
             <img className='small' src='https://github.com/edufectcode/react/blob/main/data/MyStore-sale.jpg?raw=true'/>
     
            </div>
        
          <h4 className='text-center'>Summary of Your order</h4>
          <h6 className='text-center'>your order has {arr.length} items</h6>
         <div className='row bg-secondary'>
            <div className='col-3'>Name</div>
            <div className='col-3'>Quantity</div>
            <div className='col-3'>value</div>
         </div>
         {
            arr.map(elem=>(
                <div className='row border'>
                   <div className='col-3'>{elem.name}</div>
                   <div className='col-3'>{elem.quantity}</div>
                   <div className='col-3'>{elem.quantity*elem.price}</div>  
                </div>    
            ))
         }
         <div className='row border'>
            <div className='col-12'>Total {val}</div>
         </div>
         <div className='row'>
             <h5 className='text-center'> Delivey Address</h5>
             <label className='form-label'>Name</label>
             <input type='text' className='form-control' name='name' value={name} onChange={this.handleChange}/>
             <label className='form-label'>Address</label>
             <input type='text' className='form-control' name='building' placeholder='building no' value={building} onChange={this.handleChange}/>
             <input type='text' className='form-control' name='sector' value={sector} placeholder='sector' onChange={this.handleChange}/>
             <label className='form-label'>city</label>
             <input type='text' className='form-control' name='city' value={city} placeholder='city' onChange={this.handleChange}/>
         </div>
         <div className='row'>
            <div className='col-2'>
            <button className='btn btn-success mt-1' onClick={this.handleSubmit}>submit</button>
            </div>
         </div>
         </div>

        

        
        )
    }
}
export default StoreSummary