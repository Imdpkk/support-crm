def analyze_ticket(description):

    text = description.lower()

    if "payment" in text:
        return """
Category: Payment

Priority: High

Summary:
Customer reported a payment-related issue.
"""

    elif "login" in text:
        return """
Category: Authentication

Priority: Medium

Summary:
Customer is unable to login to the system.
"""

    elif "refund" in text:
        return """
Category: Refund

Priority: High

Summary:
Customer requested a refund.
"""

    elif "error" in text:
        return """
Category: Technical Issue

Priority: High

Summary:
Customer encountered a system error.
"""

    else:
        return """
Category: General Inquiry

Priority: Medium

Summary:
General customer support request.
"""