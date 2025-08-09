
```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Write a note and click "Save"


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Request body (JSON): { "content": "new note written", "date": "2025-01-01T12:00:00.000Z" }
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: Browser updates the list of notes in the DOM without reloading the page
   ```

   