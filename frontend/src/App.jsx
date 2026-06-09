import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tickets, setTickets] = useState([]);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createTicket = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/tickets",
        formData
      );

      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
      });

      fetchTickets();

      alert("Ticket Created Successfully!");
    } catch (error) {
      console.log(error);
      alert("Error creating ticket");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Customer Support CRM</h1>

      <hr />

      <h2>Create Ticket</h2>

      <input
        type="text"
        name="customer_name"
        placeholder="Customer Name"
        value={formData.customer_name}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="email"
        name="customer_email"
        placeholder="Email"
        value={formData.customer_email}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
      />

      <br />
      <br />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={createTicket}>
        Create Ticket
      </button>

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