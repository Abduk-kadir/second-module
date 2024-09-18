import React,{Component} from 'react'
import httt from '../service3/htttService3'
import auth from '../service3/authService3'
class BankCheque extends Component{
    state={
        check:{chequeNumber:'',bankName:'',branch:'',amount:''},
        bankArr:[]
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e
        let s1={...this.state}
        s1.check[input.name]=input.value
        this.setState(s1)
    }
    async fetchData(url){
        let response=await httt.get(url)
        let {data}=response;
        this.setState({bankArr:data})

    }
    componentDidMount(){
        let url='/getBanks'
        this.fetchData(url)
    }
    makeDropdown(arr,name,value,label){
        return( 
        <select class="form-select" name={name} value={value} onChange={this.handleChange}>
        <option disabled value=''>{label}</option>
        {
           arr.map(elem=>(
            <option value={elem}>{elem}</option>
           ))
        }
        
      </select>
      )
    }
    async postData(url,obj){
        try{
        let response=await httt.post(url,obj);
        alert('detail added successfully');
        this.props.history.push('/customer')
        }
        catch(ex){

        }

    }
    addCheck=()=>{
      let user=auth.getUser()
      let {name}=user;
      let {check}=this.state
      let obj={...check,name:name}
      let url='/postCheque'
      this.postData(url,obj)
    }

    render(){
        let {chequeNumber,bankName,branch,amount}=this.state.check;
        let {bankArr}=this.state
        return(
            <div className='container'>
                <label className='form-label'>Cheaque Number</label>
                <input className='form-control' type='text' name='chequeNumber' value={chequeNumber} onChange={this.handleChange}/>
                <label className='form-label'>Bank Name</label>
                 {this.makeDropdown(bankArr,'bankName',bankName,'select Bank')}

                <label className='form-label'>Branch</label>
                <input className='form-control' type='text' name='branch' value={branch}  onChange={this.handleChange}/>
                <label className='form-label'>Amount</label>
                <input className='form-control' type='text' name='amount' value={amount}  onChange={this.handleChange}/>
                <button className='btn btn-primary' onClick={this.addCheck}>Add Cheaque</button>
                
                
            </div>
        )
    }
}
export default  BankCheque