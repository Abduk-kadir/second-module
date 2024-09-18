import React,{Component} from 'react'
import httt from '../service3/htttService3'
import StoreLeftPanel from './storeLeftPanel'
import auth from '../service3/authService3'
class StoreProduct extends Component{
       state={
         products:[]
       }
    async fetchData(url){ 
        try{
            let {category}=this.props.match.params
            if(category){
                url=category?`${url}?category=${category}`:url
            }
            let response=await httt.get(url)
            let {data}=response
            this.setState({products:data})

        }
        catch(err){

        }
    }
    componentDidMount(){
      this.fetchData('/products')
    }
    componentDidUpdate(prevprops,prevstate){
        if(prevprops!==this.props){
            this.fetchData('/products')
        }
    }
    handleOptionChange=(category)=>{
      let url=`/products/${category}`
      this.props.history.push(url)
    }
    handleAdd=(id)=>{
        let s1={...this.state}
        let prod=s1.products.find(elem=>elem.id==id)
        prod.quantity=1
        let arr=auth.getCart()
          console.log(arr)
           arr.push(prod) 
           auth.addCart(arr)
            let {category}=this.props.match.params
            if(category){
                this.props.history.push(`/products/${category}`)
            }
            else{
                this.props.history.push('/products')
            } 
        
    }
    removeCart=(id)=>{
     
     
      let arr=auth.getCart()
      let index=arr.findIndex(elem=>elem.id==id)
        arr.splice(index,1)
         auth.addCart(arr)
          let {category}=this.props.match.params
          if(category){
              this.props.history.push(`/products/${category}`)
          }
          else{
              this.props.history.push('/products')
          } 
      
  }
    render(){
        let {products}=this.state
        let arr=auth.getCart()
        arr=arr.map(elem=>elem.id)
        return(
          <div className='container'>

            
            <div className='row'>
             
                <img className='small' src='https://github.com/edufectcode/react/blob/main/data/MyStore-sale.jpg?raw=true'/>
        
            </div>
            <div className='row'>
            <div className='col-3'><StoreLeftPanel onOptionChange={this.handleOptionChange}/></div>   
            <div className='col-9'> 

            <div className='row'>
                {products.map(elem=>(
                  <div className='col-4 border text-truncate'>
                    <img className='img-fluid' src={elem.imageLink}/>
                    <h6>{elem.name}</h6>
                    <p>Rs:{elem.price}</p>
                    <p>{elem.description}</p>
                     {
                     arr.find(id=>id==elem.id)
                     ? 
                    <button className='btn btn-warning' onClick={()=>this.removeCart(elem.id)}>Remove from cart </button>
                    :
                    <button className='btn btn-success' onClick={()=>this.handleAdd(elem.id)}>Add to cart </button>
                     }
                  </div>  
                ))}
            </div>
            
            </div>  
            </div>
            
          </div>
        )
    }
}
export default StoreProduct