import React,{Component} from 'react'
class BankLeftPanel extends Component{
    state={
        bankArr:['SBI','ICICI','HDFC','AXIS','DBS','GBI'],
        amountArr:['<10000','>10000']
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e
        let qparams={...this.props.qparams}
        qparams[input.name]=input.value;
        this.props.onOptionChange(qparams)

    }
    makeRadio(arr,name, value){
        return(
            arr.map(elem=>(
              <div className='row border bg-light'>
               <div className='col-12'>
                <div class="form-check">
                <input class="form-check-input" type="radio" name={name} value={elem} checked={elem==value} onChange={this.handleChange} />
               <label class="form-check-label" for="flexRadioDefault1">
                {elem}
               </label>
               </div>
                </div>
               </div> 
            ))
        )
    }

    render(){
        let {bankArr,amountArr}=this.state
        let {qparams}=this.props;
        let {bank,amount}=qparams
       
        return(
            <div className='container'>
                 <div className='row border bg-light'>
                   <div className='col-12'> <strong>Bank</strong></div>
                 </div>
                
                {this.makeRadio(bankArr,'bank',bank)}
                
                <hr/>
                <div className='row border bg-light'>
                   <div className='col-12'> <strong>Amount</strong></div>
                 </div>
               
                {this.makeRadio(amountArr,'amount',amount)}
            </div>
        )
    }
}
export default BankLeftPanel