import { useEffect, useState } from "react"
import { getStaffUsers } from "../../services/userService.js"
import { User } from "../../users/User.jsx"
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
            return <User user={employeeObj} />
        
    })}
    </div>
)       
}

