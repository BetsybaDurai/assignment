const mongoose = require('mongoose');
// const validator = require('validator');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/task-manager-api`, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
module.exports = connectDB;


// mongoose.connect('mongodb://localhost:27017/task-manager-api', {

//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,

// }).then(() => {
//       console.log("Successfully connected to database");
//     })
//     .catch((error) => {
//       console.log("database connection failed. exiting now...");
//       console.error(error);
//     //   process.exit(1);
//     });
