{
  "name": "Event",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "event_date": {
      "type": "string",
      "format": "date"
    },
    "start_time": {
      "type": "string"
    },
    "end_time": {
      "type": "string"
    },
    "location": {
      "type": "string"
    },
    "event_type": {
      "type": "string",
      "enum": [
        "meeting",
        "social",
        "maintenance",
        "other"
      ],
      "default": "meeting"
    },
    "is_mandatory": {
      "type": "boolean",
      "default": false
    },
    "organizer": {
      "type": "string"
    }
  },
  "required": [
    "title",
    "event_date"
  ]
}