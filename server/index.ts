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
  try {
    // static import so the route is always registered
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { handleComments } = await import("./routes/comments");
    app.post("/api/comments", handleComments);
  } catch (err) {
    console.warn("Comments route failed to register:", err);
  }

  return app;
}
