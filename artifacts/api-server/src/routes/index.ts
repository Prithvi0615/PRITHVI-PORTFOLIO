import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.use(healthRouter);

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  logger.info({ name, email, message }, "Received contact form submission");

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields: name, email, and message are required." });
    return;
  }

  res.json({ status: "ok", message: "Message received successfully!" });
});

export default router;
