import React,{Component} from 'react'
import auth from '../service3/authService3'
import queryString from 'query-string'
import httt from '../service3/htttService3'
class ParticularCheckTrans extends Component{
    state={
      checks:{}
    }
    async fetchData(url){
        let qparams=queryString.parse(this.props.location.search)
       let  str=this.makeSearchString(qparams)
       str=str?`?${str}`:str
        let response=await httt.get(url+str)
        let {data}=response;
        
        this.setState({checks:data,start:1,end:data.totalItems})
        
    }
    makeSearchString(qparams){
        let {page}=qparams
        let searchStr;
        searchStr=this.addSearchStr(searchStr,'page',page)
        return searchStr
    }
    addSearchStr(str,name,value){
        
        return value?str?`&${name}=${value}`:`${name}=${value}`:''
    }
    
   callUrl(url,str){
     this.props.history.push({
       pathname:url,
       search:str
     })
   }
   handleIncr=(incr)=>{
     
    let qparams=queryString.parse(this.props.location.search)
    qparams.page=+qparams.page
   qparams.page+=incr
    let str=this.makeSearchString(qparams);
    console.log(str)
    let url='/viewCheaque'
    this.callUrl(url,str)
   }
    componentDidMount(){
       let user=auth.getUser()
       let {name}=user
       let url=`/getChequeByName/${name}`
       this.fetchData(url)
    }
    componentDidUpdate(preprops,prevstate){
     if(preprops!=this.props){
        let user=auth.getUser()
        let {name}=user
        let url=`/getChequeByName/${name}`
        this.fetchData(url)
     }
    }
    render(){
        let {checks,start,end}=this.state
        let {items=[],page,totalItems,totalNum}=checks
        let qparams=queryString.parse(this.props.location.search)
       

        return(
           <div className='container mt-5'>
             <h4>All Cheaque Details</h4>
             {
              items.length>0?  
             <div className='row border bg-light'>
               <div className='col-3'><strong>Name</strong></div>
               <div className='col-3'><strong>Cheaque Number</strong></div>
               <div className='col-2'><strong>Bank Name</strong></div>
               <div className='col-2'><storng>Branch</storng></div>
               <div className='col-2'><strong>Amount</strong></div>
             </div>
             :<h6 className='text-danger'>No Transcation to Show</h6>
          }
             {
                items.map((elem,index)=>(
                    <div className={index%2==0?'row  bg-light':'row border bg-secondary bg-opacity-10'}>
                    <div className='col-3'>{elem.name}</div>
                    <div className='col-3'>{elem.chequeNumber}</div>
                    <div className='col-2'>{elem.bankName}</div>
                    <div className='col-2'>{elem.branch}</div>
                    <div className='col-2'>{elem.amount}</div>
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
export default ParticularCheckTrans