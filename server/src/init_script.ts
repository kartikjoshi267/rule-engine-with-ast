import Rule from "./models/rule.model";
import AstHelper from "./services/helpers/ast-helper";
import { v4 as uuid } from 'uuid';

const ruleStrings = [
  "(age >= 90 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')",
  "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience >5)",
  "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience >5)"
];

const initializeData = async () => {
  const rules = await Rule.find();
  if (rules && rules.length > 0) {
    return;
  }
  for (let i = 0; i < ruleStrings.length; i++) {
    const combinedAST = AstHelper.constructAst(ruleStrings[i]);
    const rule = new Rule({
      name: `Rule ${i + 1}`,
      ruleString: ruleStrings[i],
      ast: combinedAST
    });
    await rule.save();
  }
};

export default initializeData