import { Application, Router, DejsEngine } from "./deps.ts";

const app = new Application({
  port: 3001,
  viewEngine: new DejsEngine("./templates"),
});
const router = new Router();

app.get("/home", async (ctx) => {
  await ctx.res
    .render("index.ejs", { name: "World" });
  return true;
});

await app.run();
