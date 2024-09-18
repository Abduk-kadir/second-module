import React,{Component} from 'react'
import httt from '../service3/htttService3'
class StoreManageProd extends Component{
     state={
        user:{name:'',price:'',description:'',category:'',imageLink:''},
        search:'',
        products:[],
        view:0,
        arr:['Sunglasses',"Belts","Handbags",'Watches',"Formal Shoes",'Sport Shoes','Sandals']
     }
     
   async fetchData(url){
    let response=await httt.get(url)
    let {data}=response;
    this.setState({products:data})
   }
   handleChange=(e)=>{
    let {currentTarget:input}=e
    let s1={...this.state}
    s1[input.name]=input.value 
    this.setState(s1)
   }
    async putData(url,obj){
    let response=await httt.put(url,obj)
  
   }
   handleEdit2=()=>{
    let {editprod}=this.state
    console.log(editprod)
    let url=`/products/${editprod.id}`
    this.putData(url,editprod)
   }
   handleChange2=(e)=>{
    let {currentTarget:input}=e
    let s1={...this.state}
    s1.editprod[input.name]=input.value 
    this.setState(s1)
   }
   makeEditView(){
    let {editprod,arr}=this.state
    let {name,description,price,category,imageLink}=editprod
    return (
        <div className='container mt-4'>
         <div className='row'> 
         <div className='col-5'>

         <div class="card">
         <img src={editprod.imageLink} class="card-img-top" alt="..."/>
        <div class="card-body">
        <h6> {editprod.name}</h6>
         Categor:{editprod.category}
         <br/>
         price:{editprod.price}
        </div>
        </div>
         </div>
         <div className='col-7'>
        <label className='form-label'>Name</label>
        <input type='text' className='form-control' name='name' placeholder='name' value={name} onChange={this.handleChange2}/>
        
        <label className='form-label'>Description</label>
        <input type='text' className='form-control' name='description' placeholder='name' value={description} onChange={this.handleChange2}/>
      
        <label className='form-label'>ImageLink</label>
        <input type='text' className='form-control' name='imageLink' placeholder='ImageLink' value={imageLink} onChange={this.handleChange2}/>

        <label className='form-label'>price</label>
        <input type='number' className='form-control' name='price' placeholder='price' value={price} onChange={this.handleChange2}/>
        <label className='form-label'>Category</label>
        <select class="form-select" aria-label="Default select example" name='category' value={category} onChange={this.handleChange2}>
           <option value='' disabled>select Category</option>
           {
              arr.map(elem=>(
                  <option value={elem}>{elem}</option> 
              ))
           }
           
       </select>
       <button className='btn btn-success' onClick={this.handleEdit2}>Edit</button>
       </div>
       </div>  
      </div>
    )
   }
   handleEdit=(id)=>{
    let s1={...this.state}
     s1.view=1;
     let editprod=s1.products.find(elem=>elem.id==id)
     s1.editprod=editprod
     this.setState(s1)
   }
   handleDelete=(id)=>{
    this.props.history.push(`/delete/${id}`)
   }
   handleAdd=()=>{
      this.props.history.push('/addProduct')
   }

   componentDidMount(){
    this.fetchData('/products')
   }
    render(){
        let {products,search,view}=this.state
       products= search?products.filter(elem=>elem.name[0]==search[0]):products
       console.log(search[0])
       return(
        <div className='container'>
         { view==0?
          <React.Fragment>
            <button className='btn btn-success mt-2' onClick={this.handleAdd}>Add Product</button>
            <input className='form-control mt-2 mb-2' type='text' placeholder='serach product' onChange={this.handleChange} name='search' value={search}/>

            <h6>Showing product: {products.length}</h6>
           <div className='row mt-2 border bg-secondary'>
                <div className='col-2'> Id </div>
                <div className='col-3'> Name </div>
                <div className='col-2'> Category </div>
                <div className='col-2'> Price </div>
                <div className='col-3'> </div>
              
            </div>
            {
                products.map(elem=>(
                    <div className='row mt-2 border bg-light'>
                    <div className='col-2'>{elem.id} </div>
                    <div className='col-3'>{elem.name}</div>
                    <div className='col-2'>{elem.category} </div>
                    <div className='col-2'>{elem.price} </div>
                    <div className='col-3'>
                     <button className='btn btn-light btn-sm text-primary'onClick={()=>this.handleEdit(elem.id)} >Edit</button>
                     <button className='btn btn-light btn-sm text-primary' onClick={()=>this.handleDelete(elem.id)}>Delete</button>
                    </div>
                   </div>
                ))
            }
        </React.Fragment> 
        :this.makeEditView()
        }     
        </div>
       )
    }
}
export default StoreManageProd