import express, { Request, Response } from "express";
import { loadDoroAsync } from "./doro";
import path from "path";

const app = express();
const hostname = "localhost";
const port = 5000;
const publicDir = path.resolve(__dirname, "public");

app.use("/", express.static(publicDir));

app.get("/api", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Express server is running!" });
});
app.get("/api/doro", async (req: Request, res: Response) => {
  const doro = loadDoroAsync();
  return res.status(200).contentType("png").send(doro);
});

app.listen(port, hostname, () => {
  console.log(`Server is running on: http://${hostname}:${port}/`);
  console.log(`Api route is: http://${hostname}:${port}/api`);
});
