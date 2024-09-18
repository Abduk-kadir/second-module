import React,{Component} from 'react'
import httt from '../service3/htttService3'
class StoreAddProd extends Component{
    state={
        prod:{name:'',category:'',imageLink:'',description:'',price:''},
        arr:['Sunglasses',"Belts","Handbags",'Watches',"Formal Shoes",'Sport Shoes','Sandals']
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e
        let s1={...this.state}
        s1.prod[input.name]=input.value 
        this.setState(s1)
       }
    async postData(url,obj){
        let response=await httt.post(url,obj)
        this.props.history.push('/manage product')
    }
     handleAdd=()=>{
       let prod=this.state.prod
       this.postData('/addProduct',prod)

     }  

    render(){
        let {prod,arr}=this.state
        let {name,category,imageLink,description,price}=prod
        return(
            <div className='container'>
              <label className='form-label'>Name</label>
              <input type='text' className='form-control' name='name' placeholder='name' value={name} onChange={this.handleChange}/>
              
              <label className='form-label'>Description</label>
              <input type='text' className='form-control' name='description' placeholder='name' value={description} onChange={this.handleChange}/>
            
              <label className='form-label'>ImageLink</label>
              <input type='text' className='form-control' name='imageLink' placeholder='ImageLink' value={imageLink} onChange={this.handleChange}/>

              <label className='form-label'>price</label>
              <input type='number' className='form-control' name='price' placeholder='price' value={price} onChange={this.handleChange}/>
              <label className='form-label'>Category</label>
              <select class="form-select" aria-label="Default select example" name='category' value={category} onChange={this.handleChange}>
                 <option value='' disabled>select Category</option>
                 {
                    arr.map(elem=>(
                        <option value={elem}>{elem}</option> 
                    ))
                 }
                 
             </select>
             <button className='btn btn-success' onClick={this.handleAdd}>Add</button>
            </div>
        )
    }
}
export default StoreAddProd
