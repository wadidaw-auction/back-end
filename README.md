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
