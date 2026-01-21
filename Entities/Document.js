{
  "name": "Document",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "rules",
        "minutes",
        "forms",
        "policies",
        "financial",
        "other"
      ],
      "default": "other"
    },
    "file_url": {
      "type": "string"
    },
    "uploaded_by": {
      "type": "string"
    },
    "is_public": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "title",
    "file_url"
  ]
}