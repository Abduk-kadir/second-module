import React,{Component} from 'react'
import http from '../service2/httpservice2'
import queryString from 'query-string'
class Employees extends Component{
    state={
        employeesData:{}
    }
     async getEmployees(url){
        let qparams=queryString.parse(this.props.location.search)
        let str=this.makeSearchStr(qparams)
        str=str?`?${str}`:str
        let response=await http.get(url+str)
        let {data}=response;
        this.setState({employeesData:data})
     }
    componentDidMount(){
     let url='/empapp/emps'
     this.getEmployees(url);
    }
    componentDidUpdate(prevprops,prevstate){
        if(prevprops!=this.props){
            let url='/empapp/emps'
            this.getEmployees(url); 
        }
    }
    makeSearchStr=(js)=>{
      console.log('json is',js)  
      let {page}=js;
      let searchstr;
      searchstr=this.addSearchStr(searchstr,'page',page)
      console.log('search',searchstr)
      return searchstr
    }
    addSearchStr=(str,name,value)=>{
       
      return value?str?`&${name}=${value}`:`${name}=${value}`:''  

    }
    handleIncrement=(incr)=>{
        let qparams=queryString.parse(this.props.location.search)
        let {page=1}=qparams;
        page=+page;
        page+=incr
        let url=`/admin/viewemp?page=${page}`
        this.props.history.push(url)
    }
   
  handleDetail=(id)=>{
    this.props.history.push(`/admin/viewemp/${id}`)
  }

    render(){
        let {employeesData} =this.state
        let {data=[],pageInfo={}}=employeesData
        let {pageNumber,numOfItems,totalItemCount}=pageInfo
        console.log(data.length<totalItemCount)
        return(
            <div className='container  mt-5'>
            
            <div className='row  bg-primary'>
            <div className='col-4 border'>Name</div>
            <div className='col-4 border'>Email</div>
            <div className='col-4 border'></div>
            </div>
            {
                data.map(elem=>(
                    <div className='row'>
                    <div className='col-4 border'>{elem.name}</div>
                    <div className='col-4 border'>{elem.email}</div>
                    <div className='col-4 border'>
                      <button className='btn btn-light border' onClick={()=>this.handleDetail(elem.empuserid)}>Detail</button>  
                    </div>
                    </div>
                ))
            }

           <div className='row'>
            <div className='col-2'>
            {pageNumber==1?'': <button className='btn btn-primary' onClick={()=>this.handleIncrement(-1)}>Prev</button>}
            </div>
            <div className='col-8'></div>
            <div className='col-2'>
              {data.length<totalItemCount? <button className='btn btn-primary'  onClick={()=>this.handleIncrement(1)}>Next</button>:''}
            </div>
           </div>
            </div>
        )
    }
}
export default Employees