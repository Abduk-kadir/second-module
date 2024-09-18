import React,{Component} from 'react'
import queryString from 'query-string';
import httt from '../service3/htttService3';
class BankAllcustomer extends Component{
     state={
        customers:{},
        start:'',
        end:''
        
     }
    async fetchData(url){
        let  qparams=queryString.parse(this.props.location.search)
        let {page}=qparams
        let response=await httt.get(url)
        let {data}=response
        this.setState({customers:data})
    }
    componentDidMount(){
    let  qparams=queryString.parse(this.props.location.search)
    let {page}=qparams 
    let url=`/getCustomers?page=${page}`
    this.fetchData(url)
    }
    componentDidUpdate(prevprops,prevstate){
        if(prevprops!=this.props){  
           
            let  qparams=queryString.parse(this.props.location.search)
            let {page}=qparams 
            let url=`/getCustomers?page=${page}`
            this.fetchData(url)

        }
    }
     
   
    handleIncr=(incr)=>{
        let  qparams=queryString.parse(this.props.location.search)
        let {page}=qparams 
        page=+page
        page+=incr
        let url=`/allCustomer?page=${page}`
        this.props.history.push(url)
    }
  
    render(){
        let {items=[],totalItems,totalNum,page}=this.state.customers
        return (
            <div className='container'>
                <h4>All Customers</h4>
                <div className='row border bg-light'>
                        <div className='col-2'><strong>Name</strong></div>
                        <div className='col-2'><strong>State</strong></div>
                        <div className='col-2'><strong>City</strong></div>
                        <div className='col-2'><strong>Pan</strong></div>
                        <div className='col-2'><strong>Dob</strong></div>
                      
                    </div>
                {
                  items.map((elem,index)=>(
                    <div className={index%2==0?'row  bg-light':'row border bg-secondary bg-opacity-10'}>
                        <div className='col-2'>{elem.name}</div>
                        <div className='col-2'>{elem.state}</div>
                        <div className='col-2'>{elem.city}</div>
                        <div className='col-2'>{elem.PAN}</div>
                        <div className='col-2'>{elem.dob}</div>
                      
                    </div>
                  ))
                }

                   <div className='row mt-1'>
                        <div className='col-1'>
                        {page==1?'':<button className='btn btn-secondary' onClick={()=>this.handleIncr(-1)}>prev</button>}
                        </div>
                         <div className='col-10'></div>
                        <div className='col-1'>
                        {totalItems<5?'':<button className='btn btn-secondary'onClick={()=>this.handleIncr(1)}>Next</button>}
                        </div>
                      
                    </div>
            </div>
        )
    }
}
export default BankAllcustomer;