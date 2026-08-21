const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const methodOverride = require('method-override')
const app = express()
let port = process.env.PORT || 2000;
const Todo = require('./models/TodoModels')

app.use(express.static("public"))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(methodOverride('_Method'))



app.use(express.urlencoded({ extended: true })); 


// getting-started.js

main().then((res)=>{
    console.log("connnection succusful")
}).
catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo');

}

app.get("/create", (req, res) => {
    res.render("show.ejs");
});

app.post("/create/new", async (req, res) => {
    const { title } = req.body;

    const todo = new Todo({
        title: title
    });

    await todo.save();

    res.redirect("/create/new");
});

app.get("/create/new", async (req, res) => {
    const todoes = await Todo.find();

    res.render("all.ejs", { todoes });
});


app.get('/create/:id/edit',async(req,res)=>{
   let {id} = req.params;
   let todoid = await Todo.findById(id)
   res.render("edit.ejs",{todoid})

})

app.patch("/create/:id",async(req,res)=>{
    let {id} = req.params
    let {title} = req.body;
     console.log(title);
     
    let updatetitle = await Todo.findByIdAndUpdate(id,{title:title},{new: true, runValidators: true})
    res.redirect("/create/new")
})


app.delete("/create/:id", async (req, res) => {
    let { id } = req.params;
    let deletetitle = await Todo.findByIdAndDelete(id);
    res.redirect("/create/new");
});



app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
    
})