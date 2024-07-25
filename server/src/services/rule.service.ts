import Rule from "../models/rule.model";
import BadRequestError from "../utils/err/bad-request-error";
import AstHelper from "./helpers/ast-helper";

const createRule = async (ruleString: string, name: string) => {
  const ast = AstHelper.constructAst(ruleString);
  const existingRule = await Rule.findOne({ name });
  if (existingRule) {
    throw new BadRequestError("Rule with same name already exists");
  }
  const rule = new Rule({ ruleString, ast, name });
  await rule.save();
  return {
    ruleString: rule.ruleString,
    ast: {
      left: rule.ast.left,
      right: rule.ast.right,
      value: rule.ast.value,
      type: rule.ast.type,
    },
    name: rule.name,
  };
};

const combineRules = (ruleStrings: string[]) => {
  const combinedAST = AstHelper.combineRules(ruleStrings);
  return combinedAST;
};

const evaluateRule = (ast: any, data: any) => {
  // console.log(ast);
  return AstHelper.evaluateAST(ast, data);
};

const getRules = async () => {
  const rules = await Rule.find().select("ruleString name ast.left ast.right ast.value ast.type");
  return rules;
};

export {
  createRule,
  combineRules,
  evaluateRule,
  getRules,
};
