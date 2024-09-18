import React,{Component} from 'react'
import http from '../services/httpService'

class AddProduct extends Component{
    state={
        product:{id:"",name:'',price:''},
        edit:false
    }

   handleChange=(e)=>{
     let {currentTarget:input}=e;
     let s1={...this.state}
     
     s1.product[input.name]=input.value;
     this.setState(s1)
     
   }
  async getProductData(){
    let {id}=this.props.match.params
    if(id){
    let url=`/productApp/products/${id}`
    let response=await http.get(url)
    let {data}=response;
    this.setState({product:data,edit:true})
    }
    else{
       let  product={id:"",name:'',price:''}
        this.setState({product:product,edit:false})
    }
   }
   async componentDidMount(){
   this.getProductData()
   }
   componentDidUpdate(prevprops,prevstate){
     if(prevprops!=this.props){
        this.getProductData()
     }
   }
   

  async postdata(url,obj){
    try{
     let response=await http.post(url,obj); 
     this.props.history.push('/products')
    }
    catch(ex){
        if(ex.response&&ex.response.status==400){
            let errors={}
            errors.id=ex.response.data;
            this.setState({errors:errors})
        }

           
    }
  
  }
  
  async putdata(url,obj){
    let response=await http.put(url,obj); 
    this.props.history.push('/products')
  }
handleSubmit=(e)=>{
 let {product,edit}=this.state;
 edit?this.putdata(`/productApp/products/${product.id}`,this.state.product):this.postdata('/productApp/products',this.state.product)
 
 
}

  render(){
    let {id,name,price,edit}=this.state.product
    let {errors=null}=this.state
    return(
        <React.Fragment>
          
          <div class="mb-3">
           <label for="exampleFormControlInput1" className="form-label">Id</label>
           <input type="text" className="form-control"  placeholder="enter id" name='id' value={id} onChange={this.handleChange}
           readOnly={this.state.edit}
           />
           {errors&&<span className='text-danger'>{errors.id}</span>}
           </div>
           
          <div class="mb-3">
           <label for="exampleFormControlInput1" className="form-label">Name</label>
           <input type="text" className="form-control"  placeholder="enter Name" name='name' value={name} onChange={this.handleChange}/>
           </div>
           
          <div class="mb-3">
           <label for="exampleFormControlInput1" className="form-label">Price</label>
           <input type="text" className="form-control"  placeholder="enter price" name='price' value={price} onChange={this.handleChange}/>
           </div>
          <button className='btn btn-primary' onClick={this.handleSubmit}>Submit</button>

        </React.Fragment>
    )
  }
}
export default AddProduct