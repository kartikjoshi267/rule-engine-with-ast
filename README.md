# Rule Engine with AST

## Description

This is a Rule Engine with AST. It is an implementation of Rule Engine with AST in TypeScript. Rule Engine with AST is a rule engine that uses AST to evaluate JSON data against a given rule string or multiple rule strings that are combined into a single AST and then evaluates the JSON data against the AST. It can be used to perform the following tasks:

1. Create a new AST from a given rule string
2. Combine multiple rule strings into a single AST
3. Evaluate a JSON data against the AST

## Node format

The Schema for node with operator is as follows:

```json
{
  "type": "operator",
  "left": Node,
  "right": Node,
  "value": string (AND or OR)
}
```

The Schema for node with operand is as follows:

```json
{
  "type": "operand",
  "left": null,
  "right": null,
  "value": string
}
```

## How to run the project

### 1. With Docker Compose

1. Download docker desktop from [here](https://www.docker.com/products/docker-desktop/)

2. In the `server` folder, create an `.env` file with the following content:

```text
MONGODB_URI=mongodb://mongo:27017
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
FRONTEND_URL=http://localhost:5173
```

3. Run the following command in the root directory of the project:

```bash
docker-compose up
```

4. Open the [http://localhost:5173](http://localhost:5173) in the browser.

### 2. Local Without Docker (make sure mongo server is running on the MONGODB_URI specified in the .env file in the first step)

1. In the `server` folder, create an `.env` file with the following content:

```text
MONGODB_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
FRONTEND_URL=http://localhost:5173
```

2. In the `client` folder, create an `.env` file with the following content:

```text
VITE_BACKEND_URI=http://localhost:5000
```

3. In the `server` folder, run the following command:

```bash
npm install
npm run dev
```

4. In the `client` folder, run the following command:

```bash
npm install
npm run dev
```

5. Open the [http://localhost:5173](http://localhost:5173) in the browser.