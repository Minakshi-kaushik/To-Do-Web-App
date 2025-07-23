const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

let tasks= [];

app.get("/", (req, res) => {
    res.render("index",{ tasks});
});

app.post("/add",(req, res) => {
    const newTask = req.body.task;
   tasks.push(newTask);
   if (newTask) {
        tasks.push({
            text: newTask,
            completed: false,
            date: new Date().toLocaleString()
        });
    }
    res.redirect("/");
});

app.post("/delete", (req, res)=>{
    const index = req.body.index;
    tasks.splice(index, 1);
    res.redirect("/");
});


app.post("/toggle", (req, res) => {
    const index = req.body.index;
    if (tasks[index]) {
        tasks[index].completed = !tasks[index].completed;
    }
    res.redirect("/");
});


app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});