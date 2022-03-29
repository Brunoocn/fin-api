const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  costumerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  if (costumerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  customers.push({
    name,
    cpf,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  const custumer = customers.find((costumer) => costumer.cpf === cpf);

  if (!custumer) {
    return response.status(400).json({ error: "Customer not found!" });
  }

  return response.json(custumer.statement);
});

app.listen(3333);
