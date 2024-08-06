const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Configurarea dotenv-safe pentru a valida variabilele de mediu la început
const dotenv = require("dotenv-safe");
dotenv.config({
  allowEmptyValues: false,
  path: "./.env",
  example: "./.env.example",
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// După configurarea dotenv-safe, importul ruterelor poate folosi variabilele de mediu
const authRouter = require("./routes/api/auth");
const dashboardRouter = require("./routes/api/dashboards");
const columnRouter = require("./routes/api/column");
const cardRouter = require("./routes/api/card");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/column", columnRouter);
app.use("/api/card", cardRouter);

app.use((req, res, next) => {
  if (!res.headersSent) {
    res.status(404).json({ message: "Resource not found" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log stack trace for debugging
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
