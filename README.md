# Group Project

# Wadidaw Auction API Documentation


## Models :
### User
```
name : string
email : string, unique (required) emailFormat
password : string (required)
```
### Product
```
name : string (required)
price : integer (required)
last_bidder : integer(required)
imgUrl : string
```
### Relationship :
```
User to Product : One-to-Many
```

## Base URL
www..shop


List of available endpoints:

- `POST /register`
- `POST /login` 
- `GET /user`
- `GET /user/:id`
- `GET /products`
- `GET /product/:id`

And routes below need authentication
- `POST /products/:id`


## 1. POST /login
Description:
- Login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login Success",
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email/Password"
}
```

## 2. POST /register
Description:
- Add user 

Request:

- body:

```json
{
    "username" : "string",
    "email" : "string",
    "password" : "string",
}
```

_Response (201 - Created)_

```json
{
    "message": "User has been created",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email must be unique"
}
OR
{
  "message": "Must be Email Format"
}
OR
{
  "message": "Email cannot be Empty"
}
OR
{
  "message": "Password cannot be Empty"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```
&nbsp;

## 3. GET /user
Description:
- Get User from DB

Request:
- headers : 
```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_
```json
[
    {
        "id": "integer",
        "name": "string",
        "email": "string"
    },
    {
        "id": "integer",
        "name": "string",
        "email": "string"
    }
]
```
&nbsp;
## 4. GET /user/:id
Description:
- Get User by Id from DB

Request:
- params :
```json
{
    "id": "integer (required)"
}
```

- headers : 
```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_
```json
{
    "name": "string"
}
```
_Response (404 - Not Found)_

```json
 {
    "message" : "Data Not Found"
 }
```
&nbsp;
## 5. GET /products
Description:
- Get Product from DB

Request:
- params :
```json
{
    "id": "integer (required)"
}
```

- headers : 
```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_
```json
[
    {
        "id": "integer",
        "name": "string",
        "price": "integer",
        "last_bidder": "integer",
        "createdAt": "integer",
        "updatedAt": "integer",
        "User": {
            "name": "string"
        }
    }
]
```
&nbsp;
## 6. GET /product/:id
Description:
- Get Product by Id from DB

Request:

- headers : 
```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_
```json
    {
        "id": "integer",
        "name": "string",
        "price": "integer",
        "last_bidder": "integer",
        "createdAt": "integer",
        "updatedAt": "integer",
        "User": {
            "name": "string"
        }
    }
```
_Response (404 - Not Found)_

```json
 {
    "message" : "Data Not Found"
 }
```

&nbsp;


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
OR
{
  "message": "Invalid Email/Password"
}
```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
&nbsp;