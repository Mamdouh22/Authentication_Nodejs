# Authentication and Authorization System

regarding to the delivery.

```
- service is responsible for register users.
- service is responsible for authenticate and login users.
- service is responsible for validating whether logged user is permitted to do specific action or not.
- service is resbonsible for loggin users out from the system
```

## The Stack

Used: Javascript | Nodejs | MongoDB | Mongoose | VScode | JWT | Rest API

## How to install

```
- git clon <https://github.com/Mamdouh22/Authentication_Nodejs.git>
- npm install
- npm run start
```

> How i identify and secure user's session.

```
by using jsonwebtoken with given payload{user_id , user_type} and SECRET
to feed the token and meke it more hashed and secure.
```

> how i keep user's session valid.

```
by giving the token an expiration date
```

> way i force invalidating sessions.

```
To force all sessions on all browsers to have to re-login, I simply clear the token.
```

> how i assign specific user a specific role or permission.

```
by defining a user type in user model and nvigate the roles and permissions based on the type of user
```
