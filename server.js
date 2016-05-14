const express = require("express");
const app = express();

app.use(express.static(__dirname + "/build"));

app.listen(5000, () => process.stdout.write("Server up on port 5000\n"));
