# Vet-office-api
  My personal project to build an API using Node.js and Express. The "database" is currently a simple JSON file to test functionality, not for practical use and its values are mostly taken from random generators found online (Contains no real people or pet info). 

Experience:

- API
- Node.js
- Express
- Postman
- VSCode

To Do:

- Increase functionality (let owners see their info and pet info/updates)
- Finish documentation
- Build out a website?
- Migrate to MongoDB?

References:

https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/
https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/

Dependencies:

- nodemon
- express
- body-parser
- uuid
- swagger-jsdoc
- swagger-ui-express
- jsonwebtoken

## Basic Functionality
- GET /api/v1/pets - View all pets in database
- GET /api/v1/pets/:petId - View a specific pet's record
- GET /api/v1/pets/:petId/owner - View the owner for a pet
- POST /api/v1/pets - Add a pet to the database
- PATCH /api/v1/pets/:petId - Update a specific pet's record
- DELETE /api/v1/pets/:petId - Delete a pet's information from the database

## Authorization
Currently only staff is authorized to use the API.

Future updates:

Users/owners will be able to access their info and pet info.

- POST /login - Email and password request are sent in the body and the server returns a JWT token.
- POST /logout - Authentication server logout request successful

## Query Database
For faster and more efficient load. Currently only query is 'name'.

- GET /api/v1/pets?name=lucky

## Documentation
Still a work in progress.

- GET /api/v1/docs

## Testing

- nodemon .\src\auth.js (starts the auth server at port 9001)
- nodemon .\src\index.js (starts the API server at port 9000)

Use Postman
- Obtain JWT token from /login and use header Authorization Bearer for all API requests.
