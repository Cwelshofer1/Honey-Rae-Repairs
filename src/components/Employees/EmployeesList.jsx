import { useEffect, useState } from "react"
import { getStaffUsers } from "../../services/userService.js"
import { User } from "../../users/User.jsx"
import { Link } from "react-router-dom"
import "./Employees.css"


export const EmployeeList = () => {
    const [allEmployees, setAllEmployees] = useState([])


    useEffect(() => {
    getStaffUsers().then((employeesArray) => {
        setAllEmployees(employeesArray)
    })
}, [])

 return (
    <div className="employees">
    {allEmployees.map((employeeObj) => {

            return( <Link to={`/employees/${employeeObj.id}`} key={employeeObj.id}>
            <User user={employeeObj} key={employeeObj.id} />
            </Link>
            )
    })}
    </div>
)       
}

