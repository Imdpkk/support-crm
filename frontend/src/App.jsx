import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const updateTicketStatus = async (
    ticketId,
    newStatus
  ) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/tickets/${ticketId}`,
        {
          status: newStatus,
        }
      );

      fetchTickets();
    } catch (error) {
      console.log(error);
      alert("Error updating status");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.customer_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      ticket.subject
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      ticket.ticket_id
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Customer Support CRM</h1>

      <hr />

      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        <div>Total: {totalTickets}</div>
        <div>Open: {openTickets}</div>
        <div>In Progress: {progressTickets}</div>
        <div>Closed: {closedTickets}</div>
      </div>

      <hr />

      <h2>Create Ticket</h2>

      <input
        type="text"
        name="customer_name"
        placeholder="Customer Name"
        value={formData.customer_name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="email"
        name="customer_email"
        placeholder="Email"
        value={formData.customer_email}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={createTicket}>
        Create Ticket
      </button>

      <hr />

      <h2>Search & Filter</h2>

      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
      >
        <option>All</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Closed</option>
      </select>

      <hr />

      <h2>Ticket List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Customer</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket.ticket_id}>
              <td>{ticket.ticket_id}</td>
              <td>{ticket.customer_name}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.status}</td>

              <td>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    updateTicketStatus(
                      ticket.ticket_id,
                      e.target.value
                    )
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;