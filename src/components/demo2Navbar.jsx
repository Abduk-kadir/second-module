import React,{Component} from 'react'
import {Link} from 'react-router-dom'
class Demo2Navbar extends Component{
    
    render(){
        return(
            <nav className="navbar navbar-expand-sm bg-body-tertiary">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Navbar</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                  <Link className="nav-link" to="/detail">Detail</Link>
                  <Link className="nav-link" to="/company">Company</Link>
                  <Link className="nav-link" to="/junior">Juniors</Link>
                  <Link className="nav-link" to="/logout">Logout</Link>

                </div>
              </div>
            </div>
          </nav>
        )
    }
}
export default Demo2Navbar