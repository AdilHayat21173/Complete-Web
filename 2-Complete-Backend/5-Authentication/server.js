require("dotenv").config();

const app = require('./src/app')
const ConnectDB = require('./src/db/db')

ConnectDB()

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});