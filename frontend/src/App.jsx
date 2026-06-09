import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/tickets"
      );

      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Customer Support CRM</h1>

      <hr />

      <h2>Ticket List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Customer</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.ticket_id}>
              <td>{ticket.ticket_id}</td>
              <td>{ticket.customer_name}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;