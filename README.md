# loginscreen
 
A simple sign-up / login system with a vanilla JavaScript frontend, an Express.js backend, and SQLite for storage. Passwords are hashed with `bcrypt` before being stored.
 
## Features
 
- User sign-up with name and password (hashed with bcrypt before storage)
- User login with credential verification
- Duplicate-user detection (returns a friendly error if the name is already taken)
- SQLite database via `better-sqlite3` (no separate DB server needed)
- CORS-enabled API for local frontend/backend development
## Tech Stack
 
- **Backend:** Node.js, Express 5
- **Database:** SQLite (`better-sqlite3`)
- **Password hashing:** `bcrypt`
- **Frontend:** HTML, CSS, vanilla JavaScript (`fetch` API)
- **Middleware:** `cors`, `express.json()`
## Getting Started
 
### Prerequisites
 
- [Node.js](https://nodejs.org/) (v18+ recommended)

### Backend Setup
 
```bash
npm install # Install dependencies
node index.js # Run the server
```
 
The server starts on `http://localhost:8080` (or the port set via the `PORT` environment variable). The `users` table is created automatically on startup if it doesnt already exist (see `db.js`).

### Backend Setup as a Docker container
You can also set up the backend so its a `Docker` container. You can use the `Dockerfile` that is included in the backend folder.

```bash
cd backend/ # Go to backend directory
docker build -t backend_image . # Build the image
```

Then you have to run the container.

```bash
docker run -d -t -p 8080:8080 --name backend backend_image # Run the container
```

But after stopping the container no data will be saved so you have to save the data by creating a `volume`

```bash
docker stop backend # Stop the container when its running
docker rm backend # Remove the container

docker volume create backend-data # Create the volume
docker run -d -t -p 8080:8080 -v backend-data:/app --name backend backend_image # Create a new backend container that saves its data into the volume.
```

### Frontend Setup
 
Open `index.html` in a browser or serve it with a local dev server (e.g. VS Code Live Server extension). The `api` constant in `script.js` should point to your backend:
 
```javascript
const api = "http://localhost:8080";
```
 
## Database Schema
 
```sql
CREATE TABLE IF NOT EXISTS users (
  name TEXT PRIMARY KEY,
  password TEXT NOT NULL
)
```
 
Passwords are stored as bcrypt hashes never in plain text.
 
## API Endpoints
 
| Method | Endpoint        | Description                          | Body                              |
|--------|-----------------|---------------------------------------|------------------------------------|
| GET    | `/`              | Health check / test route             | —                                      |
| POST   | `/createuser`    | Creates a new user                    | `{ "name": string, "password": string }` |
| POST   | `/login`         | Logs in an existing user              | `{ "name": string, "password": string }` |
 
### Example: Creating a user
 
```bash
curl -X POST http://localhost:8080/createuser \
  -H "Content-Type: application/json" \
  -d '{"name": "alice", "password": "secret123"}'
```
 
**Responses:**
- `201 Created` — user created successfully
- `400 Bad Request` — missing fields, user already exists, or creation failed
### Example: Logging in
 
```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"name": "alice", "password": "secret123"}'
```
 
**Responses:**
- `200 OK` — login successful
- `400 Bad Request` — missing fields, or wrong name/password
## Frontend
 
`index.html` has two sections on one page:
 
- **Sign up** — `name` / `password` inputs, calls `signUp()` in `script.js`
- **Login** — `name2` / `password2` inputs, calls `login()` in `script.js`
Both functions `fetch` the corresponding backend route and display the servers response message in the `#information` / `#information2` paragraph.
 
## Known Limitations / TODO
 
- No session/token handling — `/login` just confirms credentials are correct but doesnt issue a session, JWT, or cookie, so the frontend has no way to know "who" is logged in afterward.
- No input validation/sanitization beyond checking that fields arent empty (e.g. no length limits, no password strength requirements).
- No HTTPS — fine for local dev but credentials would be sent in plain text over a real network.
