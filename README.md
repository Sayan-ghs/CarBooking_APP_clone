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

---

*Generated on June 27, 2025*
