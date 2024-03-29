const express = require("express");
const bodyParser = require("body-parser");
require("./_helpers/db")();

const note = require("./note/note.route");
const user = require("./user/user.route");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/notes", note);
app.use("/users", user);

let port = 4000;

app.listen(port, () => {
    console.log("Server is up and running on port numner " + port);
});

module.exports = app;
