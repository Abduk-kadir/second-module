import React,{Component} from 'react'
class WelcomeBank extends Component{
    
    render(){
        return(
            <div className='container text-center'>

             <h4 className='text-danger'>Welcome to GBI Bank</h4> 
             <br/>
             <div className='row'>
                <div className='col-4'></div>
                <div className='col-4'>
                  <img  className='img-fluid' src='https://w7.pngwing.com/pngs/19/546/png-transparent-white-bank-illustration-online-banking-finance-icon-white-bank-building-building-black-white-cartoon.png'/>  
                </div>
                <div className='col-4'></div>
                
             </div>  


            </div>
        )
    }
} 
export default WelcomeBank