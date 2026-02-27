import express from "express";
import cors from "cors";
import farmRoutes from "./routes/farm";

const app = express();
const PORTA = process.env.PORT ? Number(process.env.PORT) : 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/saude", (_req, res) => {
  res.json({ status: "ok", mensagem: "Beterraba. Urso. Battlestar Galactica." });
});

app.use("/api/fazenda", farmRoutes);

app.listen(PORTA, () => {
  console.log(`?? Schrute Farms API rodando em http://localhost:${PORTA}`);
});
