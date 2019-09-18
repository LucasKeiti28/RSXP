const { test, trait } = use("Test/Suite")("Session");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

trait("Test/ApiClient");

test("It should retun JWT token when session is created", async ({
  assert,
  client
}) => {
  const sessionPayload = {
    email: "lucas@email.com",
    password: "12345678"
  };

  const user = await Factory.model("App/Models/User").create(sessionPayload);

  const response = await client
    .post("/sessions")
    .send(sessionPayload)
    .end();

  console.log(response);

  response.assertStatus(200);
  assert.exists(response.body.token);
});
