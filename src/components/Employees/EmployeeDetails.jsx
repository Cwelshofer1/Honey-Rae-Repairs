import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllEmployeesById } from "../../services/employeeService.js";





export const EmployeeDetails = () => {
    const [employee, setEmployee] = useState([])
    const { employeeId } = useParams()

    useEffect(() => {
        getAllEmployeesById(employeeId).then((data) => {
            const employeeObj = data[0]
            setEmployee(employeeObj)
        }
    )}, [employeeId])
    return <section className="customer">
        <header className="customer-header">{employee?.user?.fullName}</header>
        <div>
            <span className="customer-info">Email: {employee?.user?.email} </span>
        </div>
        <div>
            <span className="customer-info">Speciality:{employee?.speciality} </span>
        </div>
        <div>
            <span className="customer-info">Rate:</span>
            {employee?.rate}
        </div>
        <div>Currently working on {employee.employeeTickets?.length} Ticket</div>
    </section>

    
}