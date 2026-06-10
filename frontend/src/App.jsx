
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://support-crm-yo12.onrender.com";

function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

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
        `${API_URL}/api/tickets`
      );

      setTickets(response.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  const viewTicket = async (ticketId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/tickets/${ticketId}`
      );

      setSelectedTicket(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load ticket");
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
        `${API_URL}/api/tickets`,
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
      console.log("Create Error:", error);
      alert("Error creating ticket");
    }
  };

  const updateTicketStatus = async (
    ticketId,
    newStatus
  ) => {
    try {
      await axios.put(
        `${API_URL}/api/tickets/${ticketId}`,
        {
          status: newStatus,
        }
      );

      fetchTickets();
    } catch (error) {
      console.log("Update Error:", error);
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
    <div className="container-box">
      <h1>Customer Support CRM</h1>

      <div className="dashboard-cards">
        <div className="card-box total">
          Total Tickets
          <h2>{totalTickets}</h2>
        </div>

        <div className="card-box open">
          Open
          <h2>{openTickets}</h2>
        </div>

        <div className="card-box progress-card">
          In Progress
          <h2>{progressTickets}</h2>
        </div>

        <div className="card-box closed">
          Closed
          <h2>{closedTickets}</h2>
        </div>
      </div>

      <div className="form-box">
        <h2>Create Ticket</h2>

        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="customer_email"
          placeholder="Email"
          value={formData.customer_email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />

        <button
          className="create-btn"
          onClick={createTicket}
        >
          Create Ticket
        </button>
      </div>

      <div className="form-box">
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
      </div>

      <div className="table-box">
        <h2>Ticket List</h2>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Update Status</th>
              <th>View</th>
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

                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      viewTicket(ticket.ticket_id)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <div className="form-box">
          <h2>Ticket Details</h2>

          <p>
            <strong>Ticket ID:</strong>{" "}
            {selectedTicket.ticket_id}
          </p>

          <p>
            <strong>Customer:</strong>{" "}
            {selectedTicket.customer_name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {selectedTicket.customer_email}
          </p>

          <p>
            <strong>Subject:</strong>{" "}
            {selectedTicket.subject}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {selectedTicket.description}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {selectedTicket.status}
          </p>

          <button
            className="btn btn-danger"
            onClick={() =>
              setSelectedTicket(null)
            }
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
