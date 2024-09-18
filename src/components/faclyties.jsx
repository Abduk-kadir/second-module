import React,{Component} from 'react'
import StLeftPanel from './stLeftPanel'
import httt from '../service3/htttService3'
import queryString from 'query-string'

class Faclyties extends Component{
   
    state={
        staff:{},
        start:'',
        end:''
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
   async fetchData(url){
    let qparams=queryString.parse(this.props.location.search)
    let str=this.makeSearchString(qparams)
    str=str?`?${str}`:str
     let response=await httt.get(url+str)
     let {data}=response;
     let {page,totalItems,totalNums}=data
     let start=(page-1)*3
     let end=start+totalItems
     this.setState({staff:data,start:start,end:end})
    }
    componentDidMount(){
        this.fetchData('/faculty')
    }
    componentDidUpdate(prevprops,prevstate){
        if(prevprops!=this.props){
          this.fetchData('/faculty')   
        }

    }
    handleOptionChange=(js)=>{
        console.log(js)
        js.page=1
        let str=this.makeSearchString(js)
        let url='/allFaculties'
        this.callUrl(url,str)
       }
    hadleIncement=(incr)=>{
        let qparams=queryString.parse(this.props.location.search)
        let {page}=qparams
        page=+page;
        page+=incr
        qparams.page=page
       let str= this.makeSearchString(qparams)
       let url='/allFaculties'
       this.callUrl(url,str)
    }
    render(){
        let {faculty=[],totalItems,totalNums,page}=this.state.staff;
        let {start,end}=this.state
        let qparams=queryString.parse(this.props.location.search)
        return (
            <div className='container   '>
             
                <div className='row'>
                  <div className='col-3'>
                   <h4>All Faculties</h4>
                    <StLeftPanel qparams={qparams}  onOptionChange={this.handleOptionChange}/>
                  </div>  
                  <div className='col-9'>
                    <br/>
                    <br/>
                {faculty.length>0? <strong>{start+1 +' to ' +end+' from '+totalNums}</strong>:'' } 
                <div className='row'>
                    <div className='col-4'>Id</div>
                    <div className='col-4'>Name</div>
                    <div className='col-4'>Courses</div>
                </div>
                {
                    faculty.map(elem=>(
                    <div className='row border bg-warning'>
                    <div className='col-4'>{elem.id}</div>
                    <div className='col-4'>{elem.name}</div>
                    <div className='col-4'>{elem.courses.join(',')}</div>
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
export default Faclyties