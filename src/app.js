import express from "express";
import employeesRoutes from "./routes/employees.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use("/api/v1", employeesRoutes);
app.use("/api/v1", categoriesRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "EndPoint not found",
  });
});

export default app;
