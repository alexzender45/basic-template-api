// Core Dependencies
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Custom Dependencies
require("./src/db/mongoose").db().then();
const { logger } = require("./src/utils/logger");
const { PORT } = require("./src/core/config");

// Routers
const baseRouter = require("./src/router");
const userRouter = require("./src/router/userRouter");
const bankRouter = require("./src/router/bankRouter");

// App Init
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(morgan("tiny"));

// Router Middleware
app.use("/", baseRouter);
app.use("/api", userRouter);
app.use("/api", bankRouter);

app.listen(PORT, () =>
  logger.info(`Ventmode Backend Service Started on port ${PORT}`)
);
