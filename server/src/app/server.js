import "../config/env.js";
import app from "./app.js";
import connectDB from "../config/database.js";

const PORT = process.env.PORT || 8000;
const MAX_ATTEMPTS = 5;

const listen = (attempt = 1) => {
  const server = app.listen(PORT, (error) => {
    if (!error) {
      console.log(`Server is running on port ${PORT}`);
      return;
    }

    if (error.code === "EADDRINUSE" && attempt < MAX_ATTEMPTS) {
      server.close();
      console.error(
        `Port ${PORT} is busy. Retrying (${attempt}/${MAX_ATTEMPTS})...`,
      );
      setTimeout(() => listen(attempt + 1), 400);
      return;
    }

    console.error("Server failed to listen", error);
    process.exit(1);
  });

  return server;
};

connectDB()
  .then(() => {
    listen();
  })
  .catch((error) => {
    console.log("Server is not running", error);
    process.exit(1);
  });
