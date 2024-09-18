import React,{Component} from 'react'
import { Link } from 'react-router-dom'

class ProductNav extends Component{
    state={

    }
    render(){
        let {user}=this.props
        return(
            <nav className="navbar navbar-expand-sm bg-body-tertiary navbar-dark bg-dark">
     <div className="container-fluid">
    <Link className="navbar-brand" to='/'>MyProtal</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to='/products'>Products</Link>
        </li>
        {user&&
        <li className="nav-item">
          <Link className="nav-link" to='/add product'>Add Product</Link>
        </li>
        }
         {user&&user.role=='admin'&&
        <li className="nav-item">
          <Link className="nav-link" to='/users'>Users</Link>
        </li>
        }


        {!user&&
        <li className="nav-item">
          <Link className="nav-link" to='/login'>Login</Link>
        </li>
       }
       {
        user&&<li className="nav-item">
          <Link className="nav-link" to='/logout'>Logout</Link>
        </li>

       } 
        
       
      </ul>
    </div>
  </div>
</nav>
        )
    }
}
export default ProductNav