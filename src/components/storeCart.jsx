import Reac,{Component} from 'react'
import auth from '../service3/authService3'

class StoreCart extends Component{
    state={
        arr:auth.getCart(),
        User:{name:'',building:'',sector:'',city:''},
        view:0
    }
   handleIncrement=(id,incr)=>{
    console.log(id,incr)
    let s1={...this.state}
    let prod=s1.arr.find(elem=>elem.id==id)
    console.log('prod is',prod)
    prod.quantity+=incr
    if(prod.quantity==0){
      let index=s1.arr.findIndex(elem=>elem.id==id)
      s1.arr.splice(index,1)
    }
    auth.addCart(s1.arr)
    this.props.history.push('/cart')
    this.setState(s1)
   }


   handleCheckOut=()=>{
    let user=auth.getUser()
    if(!user)this.props.history.push('/login')
    if(user){
     this.props.history.push('/summary')
    }
   }
  

    render(){
      let {arr}=this.state
      let val=arr.reduce((acc,curr)=>acc+curr.quantity*curr.price,0)
      let {User,view}=this.state
      
      return(
        <div className='container'>
             
         <div className='row'>
             
             <img className='small' src='https://github.com/edufectcode/react/blob/main/data/MyStore-sale.jpg?raw=true'/>
     
         </div>

         
         
         <h4 className='mt-3'> You Have {arr.length} items</h4>
         <div className='row'>
            <div className='col-2'>{val}</div>
            <div className='col-9'></div>
            <div className='col-1'>
              <button className='btn btn-primary btn-sm'onClick={this.handleCheckOut} >Checkout</button>
            </div>
          
         </div>
         <div className='row bg-secondary'>
            <div className='col-3'></div>
            <div className='col-3'>Product</div>
            <div className='col-3'>Quantity</div>
            <div className='col-3'>Price</div>
         </div>
         {
            arr.map(elem=>(
                <div className='row'>
                 <div className='col-2'>
                 <img className='img-fluid' src={elem.imageLink}/>
                 </div>
                 <div className='col-4 text-truncate'>
                    {
                      elem.name  
                    }
                    <br/>
                    {
                      elem.category 
                    }
                    <br/>
                    {
                      elem.description  
                    }
                    <br/>

                  </div>
                 <div className='col-3'>
                  <button className='btn btn-success me-3' onClick={()=>this.handleIncrement(elem.id,1)} > + </button>
                  {elem.quantity}
                  <button className='btn btn-danger ms-3' onClick={()=>this.handleIncrement(elem.id,-1)}>-</button> 


                  </div>
                 <div className='col-3'>
                   {
                    elem.quantity*elem.price
                   }
                  </div>
         
                </div>
            ))
         }
        
        </div>
        

      )
      
    }
}
export default StoreCart