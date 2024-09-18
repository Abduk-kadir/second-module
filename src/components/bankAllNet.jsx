import React,{Component} from 'react'
import queryString from 'query-string'
import httt from '../service3/htttService3'
import BankLeftPanel from './bankLeftPanel'
class BankAllNet extends Component{
    state={
        nets:{}
    }

    async fetchData(url){
        let qparams=queryString.parse(this.props.location.search)
       let  str=this.makeSearchString(qparams)
       str=str?`?${str}`:str
        let response=await httt.get(url+str)
        let {data}=response
        this.setState({nets:data})
        
    }
    makeSearchString(qparams){
        let {page,bank,amount}=qparams
        let searchStr;
        searchStr=this.addSearchStr(searchStr,'bank',bank)
        searchStr+=this.addSearchStr(searchStr,'amount',amount)
        searchStr+=this.addSearchStr(searchStr,'page',page)
        return searchStr
    }
    addSearchStr(str,name,value){
        
        return value?str?`&${name}=${value}`:`${name}=${value}`:''
    }
    handleOptionChange=(js)=>{
        js.page=1
        let str=this.makeSearchString(js)
        let url='/allCheaque'
        this.callUrl(url,str)
  }
  callUrl(url,str){
    this.props.history.push({
      pathname:url,
      search:str
    })
  }

    componentDidMount(){
       
        let url='/getAllNetBankings'
        this.fetchData(url)
    }
    componentDidUpdate(preprops,prevstate){
        if(preprops!=this.props){
         let url='/getAllNetBankings'
         
         this.fetchData(url)
        }
     }
     handleIncr=(incr)=>{
      
       let qparams=queryString.parse(this.props.location.search)
       qparams.page=+qparams.page
      qparams.page+=incr
       let str=this.makeSearchString(qparams);
       console.log(str)
       let url='/allNet'
       this.callUrl(url,str)
     }

    render(){
        let {nets}=this.state
        let {items=[],page,totalItems,totalNums}=nets
        let qparams=queryString.parse(this.props.location.search)
       

        return(
           <div className='container mt-5'>
             <h4>All Netbanking  Transaction</h4>
            <div className='row'>
              <div className='col-3'>
                <BankLeftPanel qparams={qparams} onOptionChange={this.handleOptionChange}/>
              </div>
               <div className='col-9 '>
               
             <div className='row border bg-light'>
               <div className='col-3'><strong>Name</strong></div>
               <div className='col-3'><strong>Payee Name</strong></div>
               <div className='col-2'><strong>Amount</strong></div>
               <div className='col-2'><storng>Bank Name</storng></div>
               <div className='col-2'><strong>Comment</strong></div>
             </div>
             {
                items.map((elem,index)=>(
                    <div className={index%2==0?'row  bg-light':'row border bg-secondary bg-opacity-10'}>
                    <div className='col-3'>{elem.name}</div>
                    <div className='col-3'>{elem.payeeName}</div>
                    <div className='col-2'>{elem.amount}</div>
                    <div className='col-2'>{elem.bankName}</div>
                    <div className='col-2'>{elem.comment}</div>
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
            
            </div>
          
           </div>

        )
    }
}
export default BankAllNet