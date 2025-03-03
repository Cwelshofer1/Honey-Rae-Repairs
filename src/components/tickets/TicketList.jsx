import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import { Ticket } from "./Ticket.jsx"
import { TicketFilter } from "./TicketFilter.jsx"
import "./Ticket.css"

export const TicketList = () => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

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

useEffect(() => {
  const foundTickets = allTickets.filter((ticket) => 
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
)
setFilteredTickets(foundTickets)
}, [searchTerm, allTickets])

  return (
  <div className="tickets-container">
    <h2>Tickets</h2>
  <TicketFilter setShowEmergencyOnly ={setShowEmergencyOnly} 
  setSearchTerm = {setSearchTerm}/>
  
    <article className="tickets" key={allTickets}>
      {filteredTickets.map(ticketObject => {
        return (
         <Ticket ticket={ticketObject} key={ticketObject.id}/>
        )
      })}
    </article>
  </div>
  )
}