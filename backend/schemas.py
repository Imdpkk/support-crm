from pydantic import BaseModel, EmailStr


class TicketCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str


class TicketUpdate(BaseModel):
    status: str


class TicketResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: str
    subject: str
    description: str
    status: str

    class Config:
        from_attributes = True

class TicketAnalysisRequest(BaseModel):
    description: str


class TicketAnalysisResponse(BaseModel):
    analysis: str        