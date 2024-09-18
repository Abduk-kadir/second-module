import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import auth from '../service2/authService2'
class StoreNavbar extends Component{
    render(){
        let {cart,user}=this.props
      
        return(
          <nav className="navbar navbar-expand-sm bg-body-tertiary navbar-dark bg-dark text-light">
      <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="navbar-brand" to="/">MyStore</Link>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

      <li class="nav-item">
          <Link class="nav-link " aria-current="page" to="/Products/Watches">Watches</Link>
        </li> 
        <li class="nav-item">
          <Link class="nav-link " aria-current="page" to="/Products/Sunglasses">Sunglasses</Link>
        </li>   
        <li class="nav-item">
          <Link class="nav-link " aria-current="page" to="/Products/Belts">Belts</Link>
        </li>   
        <li class="nav-item">
          <Link class="nav-link " aria-current="page" to="/Products/Handbags">HandBags</Link>
        </li>   
     <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Footwear
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/products/Formal Shoes">Formal Shoes</Link></li>
            <li><Link class="dropdown-item" to="/products/Short Shoes">Sport Shoes</Link></li>
            <li><Link class="dropdown-item" to="/products/Sandals">Sandals</Link></li>
            <li><Link class="dropdown-item" to="/products/Floaters">Floaters</Link></li>
           
           
          </ul>
        </li>
      
      
      
      </ul>
    

      <ul className='navbar-nav'>
      {!user&&<li class="nav-item ">
          <Link class="nav-link " to='/login'>Login</Link>
       </li>
      }


       {user&&<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {user.email}
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/orders">Myorders</Link></li>
            <li><Link class="dropdown-item" to="/manage product">Manage Product</Link></li>
            <li><Link class="dropdown-item" to="/logout">Logout</Link></li>
            
           
           
          </ul>
        </li>
      }
      



    
     
      <li class="nav-item ">
          <Link class="nav-link" to='/cart'>Cart<span class="badge bg-secondary">{cart.length}</span></Link>
      </li>
    
      </ul>

    </div>
  </div>
</nav>
        )
    }
}
export default StoreNavbar