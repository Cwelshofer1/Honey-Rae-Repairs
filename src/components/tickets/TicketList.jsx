import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import { Ticket } from "./Ticket.jsx"
import "./Ticket.css"

export const TicketList = () => {
    const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])


useEffect(() => {
  getAllTickets().then((ticketsArray) => {
  setAllTickets(ticketsArray)
  console.log("tickets set")
})
}, []) // ONLY runs on intitial render of component

useEffect(() => {
  if (showEmergencyOnly) {
    const emergencyTicket = allTickets.filter(
    (ticket) => ticket.emergency === true)
    setFilteredTickets(emergencyTicket)
  } else {
    setFilteredTickets(allTickets)
  }
}, [showEmergencyOnly, allTickets])
  return (
  <div className="tickets-container">
    <h2>Tickets</h2>
    <div>
      <button 
      className="filter-btn btn-primary" 
      onClick={() => {setShowEmergencyOnly(true)}}>
        Emergency
        </button>

        <button 
        className=" filter-btn btn-secondary"
        onClick={() => {setShowEmergencyOnly(false)}}>
          Show All
        </button>
        </div>
  
    <article className="tickets" key={allTickets}>
      {filteredTickets.map(ticketObject => {
        return (
         <Ticket ticket={ticketObject} name="Joe" key={ticketObject.id}/>
        )
      })}
    </article>
  </div>
  )
}