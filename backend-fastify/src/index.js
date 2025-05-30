import dotenv from "dotenv";
import Fastify from "fastify";
import FastifyBcrypt from "fastify-bcrypt";
import FastifyJwt from "@fastify/jwt";
import FastifyMultipart from "@fastify/multipart";
import mongoose from "mongoose";
import FastifyWebsocket from "@fastify/websocket";

// Local Files
import { setFastifySwagger } from "./swagger.js";
import { setFastifyCors } from "./cors.js";
import { setFastifyRoutes } from "./routes/index.js";
import { setFastifyStatic } from "./static.js";
import { setFastifyWebsocket } from "./websocket/index.js";

dotenv.config();

const fastify = await Fastify({ logger: process.env.LOGGER || true });

// Register plugins
fastify.register(FastifyMultipart);
fastify.register(FastifyJwt, { secret: process.env.SECRET_KEY || "secret" });
fastify.register(FastifyBcrypt, {
  saltWorkFactor: Number(process.env.SALT) || 12,
});
fastify.register(FastifyWebsocket, {
  options: {
    clientTracking: true,
  },
});

// JWT Authentication Decorator
fastify.decorate("authenticate", async function (request, reply) {
  try {
    const user = await request.jwtVerify();
    request.user = user;
  } catch (err) {
    reply.send(err);
  }
});

// Register middleware and routes
setFastifySwagger(fastify);
setFastifyStatic(fastify);
setFastifyCors(fastify);
setFastifyRoutes(fastify);
setFastifyWebsocket(fastify);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    fastify.listen({ port: PORT }, (err, address) => {
      if (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
      }
      console.log(`✅ Server listening on ${address}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
