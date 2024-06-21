test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();

  // Verificar a data da consulta.
  expect(responseBody.updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(parsedUpdatedAt);

  // Verificar a versão do database.
  expect(responseBody.dependencies.database.version).toBe("16.0");

  // Verifica a quantidade máxima de conexão do database.
  expect(responseBody.dependencies.database.max_connections).toBe(100);
  // Verifica a quantidade de conexão ativas no database.
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
});
