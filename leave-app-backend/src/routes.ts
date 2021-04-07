import Router from "koa-router";

import { Auth } from "./controllers/auth/auth";
import { Leave } from "./controllers/leave/leave";
import { User } from "./controllers/user/user";
import { verifyToken } from "./helpers/auth";

export function registerRoutes() {
  const router = new Router();

  // Define routes

  // AUTH ROUTES
  router.post("/register", Auth.prototype.create);
  router.post("/login", Auth.prototype.login);

  // USER ROUTES
  router.get("/user", verifyToken, User.prototype.getUser);

  // Leave ROUTES
  router.get("/leaves", verifyToken, Leave.prototype.getAllLeaves);
  router.post("/leaves/add", verifyToken, Leave.prototype.addLeave);
  router.put("/leaves/:id", verifyToken, Leave.prototype.editLeave);
  router.put("/leaves/mark-leave/:_id", verifyToken, Leave.prototype.approveLeave);
  router.delete("/leaves/:_id", verifyToken, Leave.prototype.deleteLeave);

  return router;
}
