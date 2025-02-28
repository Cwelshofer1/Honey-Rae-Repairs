import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService.js"


export const Ticket = ( {ticket, name } ) => {
const [employees, setEmployees] = useState([])
const [assignedEmployee, setAssigniedEmployee] = useState({})

useEffect(() => {
    getAllEmployees().then((employeesArray) => {
    setEmployees(employeesArray)
    })
}, [])

useEffect(() => {
const foundEmployee = employees.find(
    (employee) => employee.id === ticket.employeeTickets[0]?.employeeId
)
setAssigniedEmployee(foundEmployee)
}, [employees, ticket])

   return ( <section className="ticket">
    <header className="ticket-info">#{ticket.id}</header>
    <div>{ticket.description}</div>
    <footer>
        <div>
            <div className="ticket-info">Assignee</div>
            <div>{assignedEmployee ? assignedEmployee.user?.fullName: "None"}</div>
        </div>
      <div>
        <div className="ticket-info">emergency</div>
        <div>{ticket.emergency ? "yes" : "no" }</div>
      </div>
    </footer>
  </section>
)
}