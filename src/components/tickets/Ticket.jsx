import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService.js"
import { assignTicket, updateTicket } from "../../services/ticketService.js"


export const Ticket = ( {ticket, currentUser, getAndSetTickets } ) => {
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

const handleClaim = () => {
const currentEmployee = employees.find(employee => employee.userId === currentUser.id)

  const newEmployeeTicket = {
    employeeId: currentEmployee.id,
    serviceTicketId: ticket.id
  }


assignTicket(newEmployeeTicket).then(() => {
getAndSetTickets()
})
}

const handleClose = () => {
  const closedTicket = {
    id: ticket.id,
    userId: ticket.userId,
    emergency: ticket.emergency,
    dateCompleted: new Date(),

  }

  updateTicket(closedTicket).then(() => {
    getAndSetTickets()
  }
)
}


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
      <div>
      <div className="ticket-info"></div>
      </div>
      <div className="btn-container">
      {/* if the logged in user is an employee and there is no employee ticket associated with the service ticket,
      then a button to claim the ticket should display.
     */ }
    {currentUser.isStaff && !assignedEmployee ? ( <button onClick={handleClaim} className="btn btn-secondary">Claim</button>
    ) : (
      ""
    )}
     {/*IF the logged in user is the assigned employee and there is no date completed then a button 
     to close the ticket should display. */}
     {assignedEmployee?.userId === currentUser.id &&
      !ticket.dateCompleted ? (
      <button className="btn-warning" onClick={handleClose}>Close</button>
     ) : (
      ""
     )}
     </div>
    </footer>
  </section>
)
}