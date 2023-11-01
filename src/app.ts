import express from "express";
import { router as TransactionsRoutes } from "./routes/transactions.routes";
import { router as UsersRoutes } from "./routes/users.routes";
import { config } from "dotenv";

config();

const app = express();
app.use(express.json());

app.use("/api/users", UsersRoutes);
app.use("/api/transactions", TransactionsRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
