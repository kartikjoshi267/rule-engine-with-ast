import { Router } from "express";
import RuleController from "../controllers/rule.controller";

const ruleAndAstRouter = Router();
RuleController(ruleAndAstRouter);

export {
  ruleAndAstRouter,
}