from fastapi import FastAPI, Depends, Query
from sqlalchemy.orm import Session
from datetime import datetime

from fastapi.middleware.cors import CORSMiddleware
# app = FastAPI()

from database import engine, get_db
from models import Base, Ticket
from schemas import TicketCreate, TicketUpdate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://support-crm-git-main-deepak-vishwakarma-s-projects.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Support CRM API is running"}


@app.post("/api/tickets")
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):

    ticket_count = db.query(Ticket).count() + 1

    ticket_id = f"TKT-{ticket_count:03d}"

    new_ticket = Ticket( 
        ticket_id=ticket_id,
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    return {
        "ticket_id": new_ticket.ticket_id,
        "message": "Ticket created successfully"
    }


@app.get("/api/tickets")
def get_tickets(
    search: str = Query(None),
    status: str = Query(None),
    db: Session = Depends(get_db)
):

    query = db.query(Ticket)

    if search:
        query = query.filter(
            (Ticket.customer_name.contains(search)) |
            (Ticket.customer_email.contains(search)) |
            (Ticket.subject.contains(search)) |
            (Ticket.description.contains(search)) |
            (Ticket.ticket_id.contains(search))
        )

    if status:
        query = query.filter(Ticket.status == status)

    tickets = query.all()

    return [
        {
            "ticket_id": ticket.ticket_id,
            "customer_name": ticket.customer_name,
            "subject": ticket.subject,
            "status": ticket.status,
            "created_at": ticket.created_at
        }
        for ticket in tickets
    ]

@app.get("/api/tickets/{ticket_id}")
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):

    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    if not ticket:
        return {"error": "Ticket not found"}

    return {
        "ticket_id": ticket.ticket_id,
        "customer_name": ticket.customer_name,
        "customer_email": ticket.customer_email,
        "subject": ticket.subject,
        "description": ticket.description,
        "status": ticket.status,
        "created_at": ticket.created_at,
        "updated_at": ticket.updated_at
    }

@app.put("/api/tickets/{ticket_id}")
def update_ticket(
    ticket_id: str,
    update_data: TicketUpdate,
    db: Session = Depends(get_db)
):

    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    if not ticket:
        return {"error": "Ticket not found"}

    ticket.status = update_data.status
    ticket.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(ticket)

    return {
        "message": "Ticket updated successfully",
        "ticket_id": ticket.ticket_id,
        "status": ticket.status
    }