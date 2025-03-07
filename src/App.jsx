import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar.jsx"
import "./App.css"
import { CustomerList } from "./components/customers/CustomersList.jsx"
import { TicketList } from "./components/tickets/TicketList.jsx"
import { EmployeeList } from "./components/Employees/EmployeesList.jsx"
import { Welcome } from "./components/welcome/Welcome.jsx"
import { CustomerDetails } from "./components/customers/CustomerDetails.jsx"
import { EmployeeDetails } from "./components/Employees/EmployeeDetails.jsx"

export const App = () => {
  return(
    
    <Routes>
      <Route path="/" element={
        <>
      <NavBar/>
      <Outlet/>
      
      </>
      }
      >
        <Route index element={<Welcome/>}/>
        <Route path="tickets" element={<TicketList/>}/>
        
        <Route path="employees">
          <Route index element={ <EmployeeList/>}/>
          <Route path=":employeeId" element={<EmployeeDetails/>}/>
          </Route>
        <Route path="customers">
          <Route index element={<CustomerList/>}/>
          <Route path=":customerId" element={<CustomerDetails/>} /> {/* /customers/:customerId*/}
        </Route>
    
      </Route>
      </Routes>

)
}
