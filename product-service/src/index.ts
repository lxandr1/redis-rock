import express, { Application, Request, Response } from "express";
import { json } from "body-parser";
import { config } from "dotenv";
import redis from "./library/redis";
config();

(async () => {
  const app: Application = express();
  const PORT = process.env["PORT"] || 1234;

  // Initialization libs used
  redis;
  redis.redisNotifyEvent();

  // Register Route
  app.get("/", (_req: Request, res: Response) => {
    res.send({
      status: "200",
      message: `🚀 Uptime => ${process.uptime()}`,
    });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Application running on port ${PORT}`);
  });
})();
