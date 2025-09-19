import { RequestHandler } from "express";

import { RequestHandler } from "express";

export const handleComments: RequestHandler = (req, res) => {
  const { name, email, comment } = req.body || {};

  if (!name || !email || !comment) {
    return res.status(400).json({ success: false, error: "name, email and comment are required" });
  }

  // In a real app you'd persist the comment to a database. For now just echo back.
  const received = {
    id: Date.now(),
    name,
    email,
    comment,
    receivedAt: new Date().toISOString(),
  };

  return res.status(201).json({ success: true, data: received });
};
