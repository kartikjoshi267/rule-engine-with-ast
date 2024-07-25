import { describe, expect, test, afterAll, beforeAll } from "@jest/globals";
import app from "../src/app";
import request from "supertest";

describe("GET '/'", () => {
  test('should return a object stating that the server is running', async () => {
    const response = await request(app).get("/")
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toBe("Server is running 🚀🚀");
  });
});

describe("POST '/api/v1/rule/create'", () => {
  test('should create a new rule', async () => {
    const response = await request(app)
      .post("/api/v1/rule/create")
      .send({ ruleString: "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience >5)", name: "Test Rule" });
    expect(response.body.statusCode).toBe(201);
    expect(response.body.message).toBe("Rule created successfully");
    expect(response.body.data.ruleString).toBe("((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience >5)");
    expect(response.body.data.ast).toEqual({
      "type": "operator",
      "left": {
        "type": "operator",
        "left": {
          "type": "operator",
          "left": {
            "type": "operand",
            "left": null,
            "right": null,
            "value": "age > 30"
          },
          "right": {
            "type": "operand",
            "left": null,
            "right": null,
            "value": "department = Sales"
          },
          "value": "AND"
        },
        "right": {
          "type": "operator",
          "left": {
            "type": "operand",
            "left": null,
            "right": null,
            "value": "age < 25"
          },
          "right": {
            "type": "operand",
            "left": null,
            "right": null,
            "value": "department = Marketing"
          },
          "value": "AND"
        },
        "value": "OR"
      },
      "right": {
        "type": "operator",
        "left": {
          "type": "operand",
          "left": null,
          "right": null,
          "value": "salary > 50000"
        },
        "right": {
          "type": "operand",
          "left": null,
          "right": null,
          "value": "experience > 5"
        },
        "value": "OR"
      },
      "value": "AND"
    });
  });
});

describe("POST '/api/v1/rule/combine'", () => {
  test('should combine rules', async () => {
    const response = await request(app)
      .post("/api/v1/rule/combine")
      .send({
        rules: [
          "age > 30 AND department = 'HR'",
          "age < 25 OR department = 'Engineering'",
          "salary > 50000 OR experience > 5"
        ],
      });
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toBe("Combined rules successfully");
    expect(response.body.data).toEqual({
      "type": "operator",
      "left": {
        "type": "operator",
        "left": {
          "type": "operator",
          "left": {
            "type": "operand",
            "left": null,
            "right": null,
            "value": "age > 30"
          },
          "right": {
            "type": "operand",
            "left": null,
            "right": null,
            "value": "department = HR"
          },
          "value": "AND"
        },
        "right": {
          "type": "operator",
          "left": {
            "type": "operand",
            "left": null,
            "right": null,
            "value": "age < 25"
          },
          "right": {
            "type": "operand",
            "left": null,
            "right": null,
            "value": "department = Engineering"
          },
          "value": "OR"
        },
        "value": "AND"
      },
      "right": {
        "type": "operator",
        "left": {
          "type": "operand",
          "left": null,
          "right": null,
          "value": "salary > 50000"
        },
        "right": {
          "type": "operand",
          "left": null,
          "right": null,
          "value": "experience > 5"
        },
        "value": "OR"
      },
      "value": "AND"
    })
  });
});

describe("POST '/api/v1/rule/evaluate'", () => {
  test('should evaluate rule', async () => {
    const response = await request(app)
      .post("/api/v1/rule/evaluate")
      .send({
        data: {
          "age": 35, "department": "Sales", "salary": 80000, "experience": 3
        },
        ast: {
          "type": "operator",
          "left": {
            "type": "operator",
            "left": {
              "type": "operator",
              "left": {
                "type": "operand",
                "left": null,
                "right": null,
                "value": "age > 30"
              },
              "right": {
                "type": "operand",
                "left": null,
                "right": null,
                "value": "department = Sales"
              },
              "value": "AND"
            },
            "right": {
              "type": "operator",
              "left": {
                "type": "operand",
                "left": null,
                "right": null,
                "value": "age < 25"
              },
              "right": {
                "type": "operand",
                "left": null,
                "right": null,
                "value": "department = Marketing"
              },
              "value": "AND"
            },
            "value": "OR"
          },
          "right": {
            "type": "operator",
            "left": {
              "type": "operand",
              "left": null,
              "right": null,
              "value": "salary > 50000"
            },
            "right": {
              "type": "operand",
              "left": null,
              "right": null,
              "value": "experience > 5"
            },
            "value": "OR"
          },
          "value": "AND"
        },
      });
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toBe("Evaluated rule successfully");
    expect(response.body.data).toEqual(true);
  });
});
