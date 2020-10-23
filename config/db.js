const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('MongoDB Connected...');

  } catch (error) {
    console.log('MongoDB Connection Error...');
    console.log(error.message);
    // Exit process with failure
    process.exit(1);
  }
}
// Check 5:03 from 7. Connecting to MongoDB...
module.exports = connectDB;