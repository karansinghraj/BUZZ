import express from "express";
import { db } from "./db/dbconfig";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { EducationRoute } from "./router/UserRouter";

const port = 4400;
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BuzzGalatic Education",
      version: "2.0.0",
    },
    servers: [{ url: `http://localhost:${port}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./router/*.ts"],
};

const swaggerspec = swaggerJSDoc(options);
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerspec));
app.use("/api/user", EducationRoute);

// Connection
(async () => {
  try {
    await db;
    console.log("start");
    app.listen(port, () => {
      console.log(`connection server http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Connection error", error);
  }
})();
