import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Comments endpoint for collecting citizen feedback
  // Dynamically import the comments handler and register route; no top-level await used
  import("./routes/comments")
    .then((mod) => {
      if (mod && mod.handleComments) {
        app.post("/api/comments", mod.handleComments);
      }
    })
    .catch((err) => {
      console.warn("Comments route failed to register:", err);
    });

  return app;
}
