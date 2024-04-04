const path = require("path");
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const jobinfo = require('./server/src/routes/jobinfo.js');
const user = require('./server/src/routes/user.js');
const jobseeker = require('./server/src/routes/jobSeekerInfo.js');
const jobapplication = require('./server/src/routes/jobapplication.js');

const app = express(); // create express app
app.use(cors());


// Define the path to the .env file relative to the current module's directory
const envPath = path.resolve(__dirname, '..', '..', '.env');

// Configure and load environment variables
dotenv.config({ path: envPath });

const port = process.env.SERVER_PORT

// Parse JSON bodies
app.use(express.json());


app.use("/users", user);
app.use("/jobinfo", jobinfo);
app.use("/jobseekerinfo", jobseeker);
app.use("/jobapplication", jobapplication);


app.get("/", (req, res) => {
  res.send("<h1>🟢The Server is up and running....</h1>");
});


// start express server on port 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});






