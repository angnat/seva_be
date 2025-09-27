import mongoose from 'mongoose';
import app from './app.js'
import logger from './configs/logger.config.js';

//env variable
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;
const dbName = "SEVA";

//exit on mognodb error
mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error : ${err}`);
  process.exit(1);
});

//mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

//mongodb connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName : dbName    
  })
  .then(() => {
    logger.info("Connected to Mongodb.");
  });

app.listen(PORT, ()=> {
    console.log("Server is listening at ", PORT);
});