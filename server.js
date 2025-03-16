import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

// for mongodb connection
mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    // why are they not needed anymore?
    // useCreateIndex: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"));
mongoose.connection.on("error", () => {
  throw new Error("unable to connect to database: " + config.mongoUri);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Brian's application" });
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
