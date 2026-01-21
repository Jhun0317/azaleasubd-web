{
  "name": "Message",
  "type": "object",
  "properties": {
    "sender_id": {
      "type": "string"
    },
    "recipient_id": {
      "type": "string",
      "description": "User ID or 'admin' for admin messages"
    },
    "subject": {
      "type": "string"
    },
    "content": {
      "type": "string"
    },
    "is_read": {
      "type": "boolean",
      "default": false
    },
    "parent_message_id": {
      "type": "string",
      "description": "For threaded replies"
    },
    "category": {
      "type": "string",
      "enum": [
        "inquiry",
        "complaint",
        "request",
        "general"
      ],
      "default": "general"
    }
  },
  "required": [
    "sender_id",
    "content"
  ]
}