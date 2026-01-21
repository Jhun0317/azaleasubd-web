{
  "name": "Resident",
  "type": "object",
  "properties": {
    "user_id": {
      "type": "string",
      "description": "Reference to User entity"
    },
    "unit_number": {
      "type": "string",
      "description": "Unit or house number"
    },
    "block": {
      "type": "string",
      "description": "Block or building name"
    },
    "phone": {
      "type": "string"
    },
    "emergency_contact": {
      "type": "string"
    },
    "emergency_phone": {
      "type": "string"
    },
    "move_in_date": {
      "type": "string",
      "format": "date"
    },
    "resident_type": {
      "type": "string",
      "enum": [
        "owner",
        "tenant"
      ],
      "default": "owner"
    },
    "profile_photo": {
      "type": "string"
    },
    "notification_preferences": {
      "type": "object",
      "properties": {
        "email_announcements": {
          "type": "boolean",
          "default": true
        },
        "email_payments": {
          "type": "boolean",
          "default": true
        },
        "email_events": {
          "type": "boolean",
          "default": true
        }
      }
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "inactive"
      ],
      "default": "active"
    }
  },
  "required": [
    "unit_number"
  ]
}