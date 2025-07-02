# Users API Documentation

## Register User

**Endpoint:** `POST /users/register`

### Description
Registers a new user account by accepting user details and returning a JSON Web Token upon successful registration.

### Request Body
Provide a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Field Requirements
- `email` (string, required): Must be a valid email address.
- `fullname.firstname` (string, required): Minimum length of 3 characters.
- `fullname.lastname` (string, optional): Minimum length of 3 characters if provided.
- `password` (string, required): Minimum length of 6 characters.

### Responses

#### 201 Created
User registration successful. Returns the created user object (without password) and a JWT token.

```json
HTTP/1.1 201 Created
{
  "user": {
    "_id": "60e7b2f5a2e4b72c1c8f9d3e",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  },
  "token": "eyJhbGciOiJI..."
}
```

#### 400 Bad Request
Validation error. Returns an array of error objects indicating which fields failed validation.

```json
HTTP/1.1 400 Bad Request
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### 500 Internal Server Error
Unexpected server error during registration.

```json
HTTP/1.1 500 Internal Server Error
{
  "message": "An unexpected error occurred."
}
```

#### Example Usage

```bash
curl -X POST "http://localhost:3000/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "securePass1"
  }'
```

**Sample Successful Response**
```json
HTTP/1.1 201 Created
{
  "user": {
    "_id": "60f8c3d9a3d1b82d9c2e4f7a",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "socketId": null
  },
  "token": "eyJhbGc..."
}
```

## Login User

**Endpoint:** `POST /users/login`

### Description
Authenticates an existing user and returns a JSON Web Token upon successful login.

### Request Body
Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Field Requirements
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum length of 6 characters.

### Responses

#### 201 Created
Login successful. Returns a JWT token and the user object.

```json
HTTP/1.1 201 Created
{
  "token": "eyJhbGciOiJI...",
  "user": {
    "_id": "60e7b2f5a2e4b72c1c8f9d3e",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### 400 Bad Request
Validation error. Returns an array of validation error objects.

```json
HTTP/1.1 400 Bad Request
{
  "errors": [
    { "msg": "Invalid email", "param": "email", "location": "body" }
  ]
}
```

#### 401 Unauthorized
Invalid email or password.

```json
HTTP/1.1 401 Unauthorized
{
  "message": "Invalid email and password"
}
```

#### 500 Internal Server Error
Unexpected server error during login.

```json
HTTP/1.1 500 Internal Server Error
{
  "message": "An unexpected error occurred."
}
```

#### Example Usage

```bash
curl -X POST "http://localhost:3000/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

**Sample Successful Response**
```json
HTTP/1.1 201 Created
{
  "token": "eyJhbGc...",
  "user": {
    "_id": "60f8c3d9a3d1b82d9c2e4f7a",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

## Get User Profile

**Endpoint:** `GET /users/profile`

### Description
Retrieves the authenticated user's profile information. Requires a valid JWT.

### Authentication
Provide the JWT token in the `Authorization` header as `Bearer <token>` or as an HTTP-only cookie named `token`.

### Responses

#### 200 OK
Returns the user's profile object.
```json
HTTP/1.1 200 OK
{
  "_id": "60f8c3d9a3d1b82d9c2e4f7a",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "socketId": null
}
```

#### 401 Unauthorized
Missing or invalid token.
```json
HTTP/1.1 401 Unauthorized
{
  "message": "Authentication failed"
}
```

**Example Usage**
```bash
curl -X GET "http://localhost:3000/users/profile" \
  -H "Authorization: Bearer eyJhbGci..."
```

## Logout User

**Endpoint:** `GET /users/logout`

### Description
Logs out the authenticated user by clearing the token cookie and blacklisting the JWT.

### Authentication
Requires a valid JWT token in the `Authorization` header or HTTP-only cookie.

### Responses

#### 201 Created
Logout successful.
```json
HTTP/1.1 201 Created
{
  "message": "Logged out"
}
```

#### 401 Unauthorized
Missing or invalid token.
```json
HTTP/1.1 401 Unauthorized
{
  "message": "Authentication failed"
}
```

**Example Usage**
```bash
curl -X GET "http://localhost:3000/users/logout" \
  -H "Authorization: Bearer eyJhbGci..."
```

## Register Captain

**Endpoint:** `POST /captain/register`

### Description
Registers a new captain by accepting captain details and vehicle information, returning a JSON Web Token upon successful registration.

### Request Body
Provide a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Johnson"
  },
  "email": "alice.johnson@example.com",
  "password": "password123",
  "vehicle": {
    "color": "blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Requirements
- `email` (string, required): Must be a valid email address.
- `fullname.firstname` (string, required): Minimum length of 3 characters.
- `fullname.lastname` (string, optional).
- `password` (string, required): Minimum length of 6 characters.
- `vehicle.color` (string, required): Minimum length of 3 characters.
- `vehicle.plate` (string, required): Minimum length of 3 characters.
- `vehicle.capacity` (integer, required): Minimum value of 1.
- `vehicle.vehicleType` (string, required): One of [`car`, `motorcycle`, `auto`].

### Responses

#### 201 Created
Registration successful. Returns a JWT token and the captain object.

```json
HTTP/1.1 201 Created
{
  "token": "eyJhbGciOiJI...",
  "captain": {
    "_id": "60f8c3d9a3d1b82d9c2e4f7a",
    "fullname": { "firstname": "Alice", "lastname": "Johnson" },
    "email": "alice.johnson@example.com",
    "vehicle": {
      "color": "blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### 400 Bad Request
Validation error or duplicate email. Returns error details.

**Validation Error Example**
```json
HTTP/1.1 400 Bad Request
{
  "errors": [
    { "msg": "Invalid email", "param": "email", "location": "body" }
  ]
}
```

**Duplicate Email Example**
```json
HTTP/1.1 400 Bad Request
{
  "message": "captain clready exist"
}
```

#### 500 Internal Server Error
Unexpected server error.

```json
HTTP/1.1 500 Internal Server Error
{
  "message": "An unexpected error occurred."
}
```

**Example Usage**
```bash
curl -X POST "http://localhost:3000/captain/register" \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Alice", "lastname": "Johnson" },
    "email": "alice.johnson@example.com",
    "password": "password123",
    "vehicle": { "color": "blue", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
  }'
```

**Sample Successful Response**
```json
HTTP/1.1 201 Created
{
  "token": "eyJhbGc...",
  "captain": {
    "_id": "60f8c3d9a3d1b82d9c2e4f7a",
    "fullname": { "firstname": "Alice", "lastname": "Johnson" },
    "email": "alice.johnson@example.com",
    "vehicle": { "color": "blue", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
  }
}
```

## Login Captain

**Endpoint:** `POST /captain/login`

### Description
Authenticates a captain and returns a JSON Web Token upon successful login.

### Request Body
```json
{
  "email": "alice.johnson@example.com",     // required, valid email format
  "password": "password123"                  // required, min length 6 characters
}
```

### Response
#### 200 OK
```json
HTTP/1.1 200 OK
{
  "token": "eyJhbGciOiJI...",               // JWT for authentication
  "captain": {
    "_id": "60f8c3d9a3d1b82d9c2e4f7a",
    "fullname": { "firstname": "Alice", "lastname": "Johnson" },
    "email": "alice.johnson@example.com",
    "vehicle": {
      "color": "blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### 400 Bad Request
Validation errors.

#### 401 Unauthorized
Invalid credentials.

#### 500 Internal Server Error
Unexpected error.

**Example Usage**
```bash
curl -X POST "http://localhost:3000/captain/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice.johnson@example.com",
    "password": "password123"
  }'
```

## Get Captain Profile

**Endpoint:** `GET /captain/profile`

### Description
Retrieves the authenticated captain's profile information.

### Authentication
Provide JWT in `Authorization` header: `Bearer <token>` or as an HTTP-only `token` cookie.

### Response
#### 200 OK
```json
HTTP/1.1 200 OK
{
  "captain": {
    "_id": "60f8c3d9a3d1b82d9c2e4f7a",
    "fullname": { "firstname": "Alice", "lastname": "Johnson" },
    "email": "alice.johnson@example.com",
    "vehicle": {
      "color": "blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### 401 Unauthorized
Authentication failed.

**Example Usage**
```bash
curl -X GET "http://localhost:3000/captain/profile" \
  -H "Authorization: Bearer eyJhbGci..."
```

## Logout Captain

**Endpoint:** `GET /captain/logout`

### Description
Logs out the captain by blacklisting the JWT and clearing the cookie.

### Response
#### 200 OK
```json
HTTP/1.1 200 OK
{
  "message": "logout successfully" // logout confirmation
}
```

#### 401 Unauthorized
Authentication failed.

**Example Usage**
```bash
curl -X GET "http://localhost:3000/captain/logout" \
  -H "Authorization: Bearer eyJhbGci..."
```

---

*Generated on June 27, 2025*
