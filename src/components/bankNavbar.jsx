import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import auth from '../service3/authService3'
class BankNavbar extends Component{
  
  render(){
    let {user}=this.props
    return(
      <nav class="navbar navbar-expand-sm bg-body-tertiary bg-warning">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
           
          {
           !user&& <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
         </li>
         }
           
           {user&&user.role=='manager'&& <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Customers
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/addCustomer">Add Customer</Link></li>
                <li><Link className="dropdown-item" to="/allCustomer?page=1">View all Customers</Link></li>
              
              </ul>
            </li>
           }
              
           {user&&user.role=='manager'&& <li class="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Transactions
              </a>
              <ul class="dropdown-menu">
                <li><Link className="dropdown-item" to="/allCheaque?page=1">Checks</Link></li>
                <li><Link className="dropdown-item" to="/allNet?page=1">Net Bankings</Link></li>
               
              </ul>
            </li>
           }
            {user&&user.role=='customer'&& <li class="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                View
              </a>
              <ul class="dropdown-menu">
                <li><Link className="dropdown-item" to="/viewCheaque?page=1">Check</Link></li>
                <li><Link className="dropdown-item" to="/viewNet?page=1">Net Bankings</Link></li>
              </ul>
            </li>
           }
            {user&&user.role=='customer'&& <li class="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Details
              </a>
              <ul class="dropdown-menu">
                <li><Link className="dropdown-item" to="/customerDetails">Customer</Link></li>
                <li><Link className="dropdown-item" to="/nomineeDetails">Nominee</Link></li>
              </ul>
            </li>
           }
             {user&&user.role=='customer'&& <li class="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Transaction
              </a>
              <ul class="dropdown-menu">
                <li><Link className="dropdown-item" to="/addPayee">Add Payee</Link></li>
                <li><Link className="dropdown-item" to="/cheque">Cheque</Link></li>
                <li><Link className="dropdown-item" to="/netBanking">Net Banking</Link></li>
              </ul>
            </li>
           }
          </ul>
      <ul class="navbar-nav">
       {
        user&&<li class="nav-item">
        <label className='nav-link'> welcome {user.name}</label>
        </li>
       }
        {user&&<li class="nav-item">
          <Link class="nav-link" to="/logout">Logout</Link>
        </li>
        }
      </ul>
        </div>
      </div>
    </nav>
    )
  }
}
export default BankNavbar