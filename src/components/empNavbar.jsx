import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import auth from '../service2/authService2'
class EmpNavbar extends Component{
    render(){
        let {user}=this.props
      
        return(
          <nav className="navbar navbar-expand-sm bg-body-tertiary navbar-dark bg-dark text-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="navbar-brand" to="/">Employee Portal</Link>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
     { user&&user.role=='ADMIN'&&<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/admin/addemp">Add Employee</Link></li>
            <li><Link class="dropdown-item" to="/admin/viewemp">View Employees</Link></li>
           
          </ul>
        </li>
      }
      {
       user&&user.role=='EMPLOYEE'&&<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            My Portal
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/emp/contact">Contact Details</Link></li>
            <li><Link class="dropdown-item" to="/emp/bills">Bills</Link></li>
           
          </ul>
        </li>
     }
      </ul>
    

      <ul className='navbar-nav'>
      {!user&&<li class="nav-item ">
          <Link class="nav-link " to='/login'>Login</Link>
      </li>
     }
     { 
      user&&<li class="nav-item ">
          <Link class="nav-link " to='/logout'>Logout</Link>
      </li>
    }
      </ul>

    </div>
  </div>
</nav>
        )
    }
}
export default EmpNavbar