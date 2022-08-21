const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const DB = require("./database/db.json");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 9001;

app.use(bodyParser.json());

const accessTokenSecret = 'youraccesstokensecret'; // Do not hardcode for real, use env variable
const refreshTokenSecret = 'yourrefreshtokensecrethere';
let refreshTokens = [];

app.post('/login', (req, res) => {
    // Read username and password from request body
    const { email, password } = req.body;

    // Filter user from the users array by username and password
    const user = DB.webLogin.find((user) => { return user.email === email && user.password === password});
    
    if (user) {
        // Create an accessToken to expire and a refreshToken on user log in
        const accessToken = jwt.sign({ username: user.email, role: user.role }, accessTokenSecret, { expiresIn: '60m' });
        const refreshToken = jwt.sign({ username: user.email, role: user.role }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });
    }else {
        res.send('Username or password incorrect');
    }
});

// Request handler to generate new tokens based on the refresh tokens
app.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.email, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});

// logout function that removes the refresh token from refreshTokens array
app.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);

    res.send("Logout successful");
});

app.listen(PORT, () => {
    console.log(`Authentication is listening on port ${PORT}`);
});
