import { Request, Response, Router } from 'express';
import { createRule, combineRules, evaluateRule, getRules } from '../services/rule.service';
import ApiResponseBuilder from '../utils/api-response-builder';
import StatusCode from '../enums/status-codes';
import BadRequestError from '../utils/err/bad-request-error';

export default function RuleController(router: Router) {
  router.post('/rule/create', async (req: Request, res: Response) => {
    const { ruleString, name } = req.body;
    if (!ruleString) {
      throw new BadRequestError('Rule string is required');
    }

    const rule = await createRule(ruleString, name);
    res.status(201).json(
      new ApiResponseBuilder()
        .message("Rule created successfully")
        .statusCode(StatusCode.CREATED)
        .data(rule)
        .build()
    );
  });

  router.post('/rule/combine', async (req: Request, res: Response) => {
    const { rules } = req.body;
    if (!rules || rules.length === 0) {
      throw new BadRequestError('At least one rule is required');
    }

    const combinedAST = combineRules(rules);
    res.status(200).json(
      new ApiResponseBuilder()
        .message("Combined rules successfully")
        .statusCode(StatusCode.OK)
        .data(combinedAST)
        .build()
    );
  });

  router.post('/rule/evaluate', async (req: Request, res: Response) => {
    const { ast, data } = req.body;
    if (!ast || !data) {
      throw new BadRequestError('AST and data are required');
    }
    
    const result = evaluateRule(ast, data);
    res.status(200).json(
      new ApiResponseBuilder()
        .message("Evaluated rule successfully")
        .statusCode(StatusCode.OK)
        .data(result)
        .build()
    );
  });

  router.get('/rule', async (req: Request, res: Response) => {
    const rules = await getRules();
    res.status(200).json(
      new ApiResponseBuilder()
        .message("Retrieved rules successfully")
        .statusCode(StatusCode.OK)
        .data(rules)
        .build()
    );
  });
};