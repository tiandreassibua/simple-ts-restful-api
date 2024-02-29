# User API Spec

## Register User

Endpoint : POST /api/users

```json
{
  "username": "andreas",
  "password": "rahasia",
  "name": "Andreas Sibua"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "andreas",
    "name": "Andreas Sibua"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

```json
{
  "username": "andreas",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "andreas",
    "name": "Andreas Sibua",
    "token": "uuid"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": {
    "username": "andreas",
    "name": "Andreas Sibua"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
- X-API-TOKEN : token

```json
{
  "password": "rahasia", // optional
  "name": "Andreas Sibua" // optional
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "andreas",
    "name": "Andreas Sibua"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint : POST /api/users

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```