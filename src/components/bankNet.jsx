import React,{Component} from 'react'
import auth from '../service3/authService3'
import httt from '../service3/htttService3'
class BankNet extends Component{
    state={
        net:{payeeName:'',amount:'',comment:''},
     payeeArr:[]
    }
    async fetchData(url){
        try{
        let response=await httt.get(url)
        let {data}=response;
        this.setState({payeeArr:data})
        }
        catch(ex){
            
        }
    }
    async postData(url,obj){
        try{
          let response=httt.post(url,obj)
          alert('transaction is successfully added')
          this.props.history.push('/customer')
        }
        catch(ex){

        }
    }
    componentDidMount(){
        let user=auth.getUser()
        let {name}=user
        let url=`/getPayees/${name}`
        this.fetchData(url)
    }
    makeDropdown(arr,name,value,label){
        return( 
        <select class="form-select" name={name} value={value} onChange={this.handleChange}>
        <option disabled value=''>{label}</option>
        {
           arr.map(elem=>(
            <option value={elem.payeeName}>{elem.payeeName}</option>
           ))
        }
        
      </select>
      )
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state}
        s1.net[input.name]=input.value
        this.setState(s1)
    }
    addTranction=()=>{
        let s1={...this.state}
        let bankName=s1.payeeArr.find(elem=>elem.payeeName==s1.net.payeeName).bankName
        let user=auth.getUser()
        let {name}=user
        let obj={...s1.net,bankName:bankName,name:name}
        this.postData('/postNet',obj)
    }
    render(){
        let {payeeArr,net}=this.state;
        let {payeeName,amount,comment}=net
        return (
            <div className='container mt-2'>
                <label className='form-label'>Payee Name</label>
                {this.makeDropdown(payeeArr,'payeeName',payeeName,'select payee')}
                <label className='form-label'>Amount</label>
                <input className='form-control' name='amount' value={amount} placeholder='enter amount' onChange={this.handleChange}/>
                <label className='form-label'>Comment</label>
                <input className='form-control' name='comment' value={comment}placeholder='enter comment' onChange={this.handleChange}/>
                <button className='btn btn-primary' onClick={this.addTranction}>Add Transaction</button>
            </div>
        )
    }
}
export default BankNet