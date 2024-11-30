const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "Project1",
});

connection.connect((error) => {
  if (error) {
    console.log("Error Connecting to DB:", error);
    return;
  }
  console.log("Connection Successful");
});

let user = {};

const inputs = {
  username: "Sheanya",
  password: "Sheanya@1",
};

const verifyPassword = (plainPassword, hashPassword) => {
  return bcrypt.compare(plainPassword, hashPassword);
};

const verifyUser = async (user, input) => {
  if (user.username === inputs.username) {
    const verified = await verifyPassword(input.password, user.password);
    if (verified) {
      return true;
    }
  }
  return false;
};

new Promise((resolve, reject) => {
  connection.query(
    "SELECT * FROM project1.users WHERE username = ?",
    [inputs.username],
    (error, result, fields) => {
      if (error) {
        console.log("Error Querying DB:", error);
        reject(error); // Propagate the error to the calling code
        return;
      }

      if (result.length === 0) {
        console.log("User Not Found");
        reject(new Error("User Not Found")); // Pass an explicit error
        return;
      }

      console.log("User Found");
      const user = result[0]; // Extract the first matching user
      resolve(user); // Resolve with the user data
    }
  );
})
  .then((user) => {
    verifyUser(user, inputs)
      .then((verified) => {
        if (verified) {
          console.log("User verified");
        } else {
          console.log("User Not verified");
        }
      })
      .catch((error) => {
        console.log("Error Verifying User", error);
      });
  })
  .catch((err) => {
    console.error("Error in Query or User Not Found:", err.message);
  });
