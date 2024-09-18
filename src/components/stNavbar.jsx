import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import auth from '../service3/authService3'
class StNavbar extends Component{
  
  render(){
    let {user}=this.props
    return(
      <nav class="navbar navbar-expand-sm bg-body-tertiary bg-success">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
         
          {user&&user.role=='admin'?<li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
          </li>
          :''
         }
          {user&&user.role=='student'?<li className="nav-item">
          <Link className="nav-link" to="/studentDetails">Student Details</Link>
          </li>
          :''
         }
          {user&&user.role=='student'?<li className="nav-item">
          <Link className="nav-link" to="/allClasses">All Classes</Link>
          </li>
          :''
         }
          {user&&user.role=='student'?<li className="nav-item">
         <Link className="nav-link" to="/allCourses">All Courses</Link>
          </li>
          :''
         }
           {user&&user.role=='faculty'?<li className="nav-item">
         <Link className="nav-link" to="/coursesAssigned"> Courses</Link>
          </li>
          :''
         }

       {user&&user.role=='faculty'?<li class="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               Class Details
              </a>
              <ul class="dropdown-menu">
                <li><Link className="dropdown-item" to="/scheduledClasses">All Scheduled Classes</Link></li>
                <li><Link className="dropdown-item" to="/sceduleClass">Scheduled A Class</Link></li>
              </ul>
            </li>
            :''
             }

          
              
           {user&&user.role=='admin'?<li class="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Assign
              </a>
              <ul class="dropdown-menu">
                <li><Link className="dropdown-item" to="/studentCourse">Student to course</Link></li>
                <li><Link className="dropdown-item" to="/facultyCourse">Faculty to Course</Link></li>
               
              </ul>
            </li>
            :''
             }
            {user&&user.role=='admin'?
            <li class="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                View
              </a>
              <ul class="dropdown-menu">
                <li><Link className="dropdown-item" to="/allStudents?page=1">All Students</Link></li>
                <li><Link className="dropdown-item" to="/allFaculties?page=1">All Faculties</Link></li>
              </ul>
            </li>
            :''
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
        {!user&&<li class="nav-item">
          <Link class="nav-link" to="/login">Login</Link>
        </li>
        }
      </ul>
        </div>
      </div>
    </nav>
    )
  }
}
export default StNavbar