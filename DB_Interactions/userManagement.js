const mysql = require("mysql2")
const bcrypt = require("bcrypt")


const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "Project1"
})

const input = {
    firstName: 'Sheanya',
    lastName: 'Sailey',
    username: 'Sheanya',
    password: 'Sheanya@1',
    email: 'Sheanya@gmail.com'
};


const hash = async (input) => {
    const saltRounds = 10;
    try {
        input.password = await bcrypt.hash(input.password, saltRounds)
    } catch (error) {
        console.log("Error Hashing Password")
        throw error
    }
}


connection.connect((err) => {
    if(err) {
        console.log("Error Connecting to DB")
        return
    }
    console.log("Connection successful")
})



hash(input)
// .then(() => {
//     connection.query("CALL project1.AddUser(?, ?, ?, ?, ?);",
//         [input.firstName, input.lastName, input.username, input.password, input.email],
//         (error, result, fields) => {
//         if(error) {
//             console.log("Error Querying DB:\n", error)
//             return
//         }
//         console.log(result);
//     })
// }).catch (
//     (err) => {
//         console.error("Hashing or Query Error:", err);
//     }
// )


connection.query("SELECT * FROM project1.users" ,(err, result, fields) => {
    if(err) {
        console.log("Error Querying to DB")
        return
    }
    console.log(result);
})


// connection.end((err) => {
//     if(err) {
//         console.log("Error Closing DB")
//     }

//     console.log("Closure Successful")
// })

