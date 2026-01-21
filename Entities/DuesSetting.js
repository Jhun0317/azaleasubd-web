{
  "name": "DuesSetting",
  "type": "object",
  "properties": {
    "monthly_amount": {
      "type": "number"
    },
    "due_day": {
      "type": "number",
      "description": "Day of month dues are due"
    },
    "late_fee": {
      "type": "number"
    },
    "grace_period_days": {
      "type": "number"
    },
    "gcash_number": {
      "type": "string"
    },
    "bank_details": {
      "type": "string"
    },
    "effective_date": {
      "type": "string",
      "format": "date"
    }
  },
  "required": [
    "monthly_amount",
    "due_day"
  ]
}