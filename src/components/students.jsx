import React,{Component} from 'react'
import httt from '../service3/htttService3'
import queryString from 'query-string'
import StLeftPanel from './stLeftPanel'
class Student extends Component{
    state={
        students:{},
        start:'',
        end:''
    }
 
    async fetchData(url){
        let params=queryString.parse(this.props.location.search)
        let str=this.makeSearchString(params)
        str=str?`?${str}`:''
        console.log(str)
        let response=await httt.get(url+str)
        let {data}=response;
        let {page,totalItems,totalNums}=data
       let start=(page-1)*3
       let end=start+totalItems
        this.setState({students:data,start:start,end:end})
       
       }
    makeSearchString(js){
        let {page,course}=js;
        let searchstr;
        searchstr=this.addSearchStr(searchstr,'page',page);
        searchstr+=this.addSearchStr(searchstr,'course',course);
        return searchstr
    }  
    addSearchStr(searchstr,name,value){

        return value?searchstr?`&${name}=${value}`:`${name}=${value}`:''
    }
    callUrl(url,str){
        this.props.history.push(
            {
                pathname:url,
                search:str
            }
        )
    }


   componentDidMount(){
     let url='/getStudents'
     this.fetchData(url)
   }
   componentDidUpdate(prevprops,prevstate){
     
     if(prevprops!=this.props){
        this.fetchData('/getStudents')
     }

   }

   hadleIncement=(incr)=>{
    let params=queryString.parse(this.props.location.search)
    let {page}=params
    page=+page;
    page+=incr
    params.page=page
    let str=this.makeSearchString(params)
    let url='/allStudents'
    this.callUrl(url,str)

   }
   handleOptionChange=(js)=>{
    console.log(js)
    js.page=1
    let str=this.makeSearchString(js)
    let url='/allStudents'
    this.callUrl(url,str)
   }

     render(){
        let {totalItems,totalNums,page,items=[]}=this.state.students
        let {end,start}=this.state
        let qparams=queryString.parse(this.props.location.search)
      
        return(

            <div className='container'>
                <div className='row'>
                 <div className='col-3'>
                   <StLeftPanel qparams={qparams} onOptionChange={this.handleOptionChange}/> 
                 </div> 
                 <div className='col-9'>
                <h5>All Students</h5>
                {items.length>0? <strong>{start+1 +' to ' +end+' from '+totalNums}</strong>:'' } 
                <div className='row'>
                    <div className='col-2'>Id</div>
                    <div className='col-2'>Name</div>
                    <div className='col-2'>Date Of Birth</div>
                    <div className='col-3'>About</div>
                    <div className='col-3'>Courses</div> 
                </div>
              {  
              items.map(elem=>(
                    <div className='row border bg-warning'>
                    <div className='col-2'>{elem.id}</div>
                    <div className='col-2'>{elem.name}</div>
                    <div className='col-2'>{elem.dob}</div>
                    <div className='col-3'>{elem.about}</div>
                    <div className='col-3'>{elem.courses?elem.courses.join(','):''}</div> 
                </div>
                    
                ))
              }
                 <div className='row mt-1'>
                    <div className='col-2'>
                      {page==1?'':<button className='btn btn-secondary btn-sm' onClick={()=>this.hadleIncement(-1)}> Prev</button>}
                    </div>
                     <div className='col-9'>
                       
                    </div>
                    <div className='col-1'>
                     {end<totalNums?<button className='btn btn-secondary btn-sm'  onClick={()=>this.hadleIncement(+1)}>Next</button>:''}
                    </div>
                 </div>
                </div>
                </div>  
             
            </div>
        )
     }
}
export default Student