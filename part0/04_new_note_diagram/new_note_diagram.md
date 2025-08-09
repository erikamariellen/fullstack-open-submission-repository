
```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: write something and click on the Save button.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Returns HTTP 302 adn Redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    browser-->user: Reload the page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "new note written by the user", "date": "2025-1-1" }, ... ]
    deactivate server


    Note right of browser: The browser executes the callback function that renders the notes

   ```