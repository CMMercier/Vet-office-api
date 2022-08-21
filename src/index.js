const express = require("express");
const bodyParser = require("body-parser");
//const apicache = require("apicache");
const v1PetRouter = require("./v1/routes/petRoutes");
const app = express();
//const cache = apicache.middleware;
const PORT = process.env.PORT || 9000;
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

app.use(bodyParser.json());
//app.use(cache("2 minutes"));
app.use("/api/v1/pets", v1PetRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
});

