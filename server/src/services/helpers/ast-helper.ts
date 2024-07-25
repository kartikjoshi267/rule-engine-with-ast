import BadRequestError from "../../utils/err/bad-request-error";

export default class AstHelper {
  private static OPERATORS = ['AND', 'OR'];
  private static PRECEDENCE: { [key: string]: number } = {
    'OR': 1,
    'AND': 2
  };

  public static createNode = (type: string, left?: any, right?: any, value?: any) => {
    return { type, left, right, value };
  };

  private static tokenize = (str: string) => {
    const regex = /(\(|\)|AND|OR|>|<|>=|<=|=|\d+|'[^']*'|[a-zA-Z_][a-zA-Z0-9_]*)/g;
    const tokens = str.match(regex)?.map(token => token.trim().replace(/^'|'$/g, "")) || [];
    
    const formattedTokens: string[] = [];
    let buffer = "";
  
    tokens.forEach(token => {
      if (["(", ")"].includes(token)) {
        if (buffer.trim()) {
          formattedTokens.push(buffer.trim());
          buffer = "";
        }
        formattedTokens.push(token);
      } else if (["AND", "OR"].includes(token)) {
        if (buffer.trim()) {
          formattedTokens.push(buffer.trim());
          buffer = "";
        }
        formattedTokens.push(token);
      } else {
        buffer += (buffer ? " " : "") + token;
      }
    });
  
    if (buffer.trim()) {
      formattedTokens.push(buffer.trim());
    }

    for (let i = 0; i < formattedTokens.length; i++) {
      if (formattedTokens[i].includes("> =")) {
        formattedTokens[i] = formattedTokens[i].replace("> =", ">=");
      } else if (formattedTokens[i].includes("< =")) {
        formattedTokens[i] = formattedTokens[i].replace("< =", "<=");
      }
    }
  
    return formattedTokens;
  };

  private static shuntingYard = (tokens: string[]) => {
    const output: string[] = [];
    const operators: string[] = [];
    
    tokens.forEach(token => {
      if (AstHelper.OPERATORS.includes(token)) {
        while (operators.length && operators[operators.length - 1] !== '(' &&
               (AstHelper.PRECEDENCE[token] < AstHelper.PRECEDENCE[operators[operators.length - 1]] || 
                (AstHelper.PRECEDENCE[token] === AstHelper.PRECEDENCE[operators[operators.length - 1]]))) {
          output.push(operators.pop()!);
        }
        operators.push(token);
      } else if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators.length && operators[operators.length - 1] !== '(') {
          output.push(operators.pop()!);
        }
        operators.pop();
      } else {
        output.push(token);
      }
    });
    
    while (operators.length) {
      output.push(operators.pop()!);
    }
    
    return output;
  };

  private static buildAST = (postfixTokens: string[]) => {
    const stack: any[] = [];
    
    postfixTokens.forEach(token => {
      if (AstHelper.OPERATORS.includes(token)) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(AstHelper.createNode('operator', left, right, token));
      } else {
        stack.push(AstHelper.createNode('operand', null, null, token));
      } 
    });
    
    return stack[0];
  };

  public static constructAst = (ruleString: string) => {
    const tokens = AstHelper.tokenize(ruleString);
  
    if (tokens.length === 0) {
      throw new BadRequestError('Invalid rule string');
    }
    const postfixTokens = AstHelper.shuntingYard(tokens);
    return AstHelper.buildAST(postfixTokens);
  };

  private static parseCondition (condition: string) {
    const match = condition.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*(>=|<=|=|>|<)\s*(.*)$/);
    if (match) {
      return {
        attribute: match[1],
        operator: match[2],
        value: match[3].replace(/^'|'$/g, "")  // Remove surrounding quotes if present
      };
    }
    throw new Error(`Invalid condition format: ${condition}`);
  };

  private static evaluateCondition (attribute: string, operator: string, value: string, data: any): boolean {
    const dataValue = data[attribute];
    if (dataValue === undefined) {
      return false;
    }
  
    switch (operator) {
      case '>':
        return Number(dataValue) > Number(value);
      case '<':
        return Number(dataValue) < Number(value);
      case '>=':
        return Number(dataValue) >= Number(value);
      case '<=':
        return Number(dataValue) <= Number(value);
      case '=':
        return dataValue === value;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  };

  public static evaluateAST = (ast: any, data: any): any => {
    if (!ast) {
      throw new BadRequestError(`Invalid AST: ${ast}`);
    }
  
    if (ast.type === 'operand') {
      const condition = AstHelper.parseCondition(ast.value!);
      return AstHelper.evaluateCondition(condition.attribute, condition.operator, condition.value, data);
    } else if (ast.type === 'operator' && AstHelper.OPERATORS.includes(ast.value)) {
        const leftResult = AstHelper.evaluateAST(ast.left!, data);
        const rightResult = AstHelper.evaluateAST(ast.right!, data);
  
        if (ast.value === 'AND') {
          return leftResult && rightResult;
        } else if (ast.value === 'OR') {
          return leftResult || rightResult;
        } else {
          throw new BadRequestError(`Unsupported logical operator: ${ast.value}`);
        }
    } else {
      throw new BadRequestError(`Unsupported node type: ${ast.type}`);
    }
  };

  public static combineRules = (ruleStrings: string[]) => {
    // const operatorFrequency: { [key: string]: number } = {};
    // const ruleAsts = ruleStrings.map(rule => {
    //   const tokens = AstHelper.tokenize(rule);
    //   tokens.forEach(token => {
    //     if (AstHelper.OPERATORS.includes(token)) {
    //       operatorFrequency[token] = (operatorFrequency[token] || 0) + 1;
    //     }
    //   });
    //   return { rule, ast: AstHelper.constructAst(rule) };
    // });
  
    // const sortedOperators = Object.keys(operatorFrequency).sort((a, b) => operatorFrequency[b] - operatorFrequency[a]);
  
    // if (ruleAsts.length === 0) return null;
    // if (ruleAsts.length === 1) return ruleAsts[0].ast;
  
    // let combinedAST = ruleAsts[0].ast;
    // for (let i = 1; i < ruleAsts.length; i++) {
    //   combinedAST = AstHelper.createNode('operator', combinedAST, ruleAsts[i].ast, sortedOperators[0]);
    // }

    let ruleString = "(";
    for (let i = 0; i < ruleStrings.length; i++) {
      ruleString += ruleStrings[i];
      if (i < ruleStrings.length - 1) {
        ruleString += ") AND (";
      } else {
        ruleString += ")";
      }
    }
    
    const tokens = AstHelper.tokenize(ruleString);
  
    if (tokens.length === 0) {
      throw new BadRequestError('Invalid rule string');
    }
    const postfixTokens = AstHelper.shuntingYard(tokens);
    return AstHelper.buildAST(postfixTokens);
  };
}
