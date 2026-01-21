{
  "name": "Payment",
  "type": "object",
  "properties": {
    "resident_id": {
      "type": "string",
      "description": "Reference to Resident"
    },
    "amount": {
      "type": "number"
    },
    "payment_type": {
      "type": "string",
      "enum": [
        "monthly_dues",
        "special_assessment",
        "fine",
        "other"
      ],
      "default": "monthly_dues"
    },
    "payment_method": {
      "type": "string",
      "enum": [
        "gcash",
        "bank_transfer",
        "cash",
        "check"
      ],
      "default": "gcash"
    },
    "reference_number": {
      "type": "string"
    },
    "receipt_url": {
      "type": "string"
    },
    "period_month": {
      "type": "string",
      "description": "Month covered (e.g., 2025-01)"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "verified",
        "rejected"
      ],
      "default": "pending"
    },
    "verified_by": {
      "type": "string"
    },
    "verified_date": {
      "type": "string",
      "format": "date-time"
    },
    "notes": {
      "type": "string"
    }
  },
  "required": [
    "resident_id",
    "amount",
    "payment_type"
  ]
}