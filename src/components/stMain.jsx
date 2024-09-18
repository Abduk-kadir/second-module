import React,{Component} from 'react'
import StNavbar from './stNavbar'
import StLogin from './stLogin'
import { Switch,Route,Redirect } from 'react-router-dom'
import WelcomeAdmin from './welcomeAdmin'
import auth from '../service3/authService3'
import Logout from './logout'
import StRegister from './stRegister'
import Student from './students'
import StudentCourse from './studentCourse'
import FaculityCourse from './faculityCourse'
import Faclyties from './faclyties'
import StudentDashboard from './studentDashboard'
import AllCourseStudent from './allCourseStudent'
import AllClassStudent from './allClassStudent'
import StudentDetail from './studentDetail'
import FacultyDashboard from './facultyDashboard'
import AllCourseFaculty from './allCourseFaculty'
import AllClassesFaculty from './allClassesFaculty'
import ScheduleClass from './scheduleClass'

class StMain extends Component{
    render(){
      let user=auth.getUser()
        return(
            <React.Fragment>
                <StNavbar user={user}/>
                <Switch>
                <Route path={'/class/edit/:id'} component={ScheduleClass}/>
                <Route path='/sceduleClass' component={ScheduleClass}/>
                <Route path='/scheduledClasses' component={AllClassesFaculty}/>
                <Route path='/coursesAssigned' component={AllCourseFaculty}/>   
                <Route path='/facultyDashboard' component={FacultyDashboard}/>

                <Route path='/studentDetails' component={StudentDetail}/>
                <Route path='/allClasses' component={AllClassStudent}/>
                <Route path='/allCourses' component={AllCourseStudent}/>
                 <Route path='/studentDashboard' component={StudentDashboard}/>

                    <Route path='/facultyCourse' component={FaculityCourse}/>
                    <Route path='/studentCourse' component={StudentCourse}/>
                    <Route path='/allFaculties' component={Faclyties}/>
                    <Route path='/allStudents' component={Student}/>
                    <Route path='/register' component={StRegister}/>
                    <Route path='/admin' component={WelcomeAdmin}/>
                    <Route path='/login' component={StLogin}/>
                    <Route path='/logout' component={Logout}/>
                  

                </Switch>
            </React.Fragment>
        )
    }
}
export default StMain