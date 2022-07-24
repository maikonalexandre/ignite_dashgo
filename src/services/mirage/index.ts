import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  createdAt: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        name(i) {
          //return `User ${i + 1}` sem o faker
          return faker.name.findName();
        },
        email() {
          return faker.internet.email().toLowerCase(); // com faker
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },
    seeds(server) {
      server.createList("user", 100);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750; //toda requisiçao ira demorar 750ms

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(200, { "x-total-count": String(total) }, { users });
      });

      this.post("/users/:id");
      this.post("/users");

      this.namespace = ""; // as api routes do next tbm usam um namespacer
      //api por isso é importante zeralo novamente
      this.passthrough(); // Quanso usamos next é importate usar
      //isso para que após a requisiçao com o mirage ele siga ]
      //adiante para uma possivel outra requisiçao
    },
  });

  return server;
}
