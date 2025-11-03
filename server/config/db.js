const mongoose = require('mongoose');

/**
 * Connect to MongoDB with retries and improved error messages for Atlas.
 * This will attempt a number of retries instead of exiting immediately so
 * the server logs give clear guidance (e.g. IP whitelist issues).
 */
const connectDB = async (opts = {}) => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MongoDB connection error: MONGODB_URI is not set in environment');
    return false;
  }

  const maxRetries = opts.retries ?? 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      attempt += 1;
      await mongoose.connect(uri, {
        // mongoose 6+ uses these by default, but set explicitly for clarity
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('MongoDB Connected');
      return true;
    } catch (error) {
      const short = (error && error.message) ? error.message : String(error);
      console.error(`MongoDB connection attempt ${attempt} failed:`, short);

      // Provide helpful hints for common Atlas/network errors
      if (short.includes('whitelist') || short.includes('IP') || short.includes('not authorized')) {
        console.error('It looks like MongoDB Atlas is rejecting the connection. Common causes:');
        console.error('- Your current IP is not added to the Atlas Network Access (IP whitelist).');
        console.error("  Add your IP in the Atlas UI under Network Access, or temporarily allow '0.0.0.0/0' for testing.");
        console.error('- The connection string may be incorrect or the user credentials are invalid.');
      }

      if (short.includes('ENOTFOUND') || short.includes('getaddrinfo') || short.includes('dns')) {
        console.error('DNS lookup failed for the Atlas hosts. Check your network/DNS configuration and that the connection string is correct.');
      }

      // If we've reached max attempts, log and return false so server can decide what to do
      if (attempt >= maxRetries) {
        console.error('MongoDB connection failed after', maxRetries, 'attempts.');
        console.error('Please verify your MONGODB_URI and network access (Atlas IP whitelist).');
        return false;
      }

      // Wait a bit before retrying (exponential backoff)
      const delay = Math.min(2000 * attempt, 10000);
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  return false;
};

module.exports = connectDB;