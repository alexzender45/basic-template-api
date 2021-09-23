// Core Dependencies
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Custom Dependencies
//require("./src/db/mongoose").db().then();
const { logger } = require("./src/utils/logger");
const { PORT } = require("./src/core/config");

// Routers
const baseRouter = require("./src/router");
const characterRouter = require("./src/router/characterRouter");
const filmRouter = require("./src/router/filmRouter");
const commentRouter = require("./src/router/commentRouter");

// App Init
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(morgan("tiny"));

// Router Middleware
app.use("/", baseRouter);
app.use("/api", characterRouter);
app.use("/api", filmRouter);
app.use("/api", commentRouter);

app.listen(PORT, () =>
  logger.info(`Metacare Backend Service Started on port ${PORT}`)
);
