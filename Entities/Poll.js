{
  "name": "Poll",
  "type": "object",
  "properties": {
    "question": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "options": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string"
          },
          "votes": {
            "type": "number",
            "default": 0
          }
        }
      }
    },
    "expires_at": {
      "type": "string",
      "format": "date"
    },
    "voters": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "User IDs who have voted"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "closed"
      ],
      "default": "active"
    }
  },
  "required": [
    "question",
    "options"
  ]
}