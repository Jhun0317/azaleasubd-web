{
  "name": "Announcement",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "content": {
      "type": "string"
    },
    "priority": {
      "type": "string",
      "enum": [
        "urgent",
        "important",
        "normal"
      ],
      "default": "normal"
    },
    "category": {
      "type": "string",
      "enum": [
        "general",
        "maintenance",
        "security",
        "event",
        "payment",
        "meeting"
      ],
      "default": "general"
    },
    "posted_by": {
      "type": "string"
    },
    "expires_at": {
      "type": "string",
      "format": "date"
    },
    "attachment_url": {
      "type": "string"
    },
    "is_pinned": {
      "type": "boolean",
      "default": false
    }
  },
  "required": [
    "title",
    "content"
  ]
}