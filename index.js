const express = require('express')
const app = express();
const path =require("path");
const port = 3000;
const {v4:uuidv4} = require("uuid");


app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));



let posts =[
    {
     id:uuidv4(),   
    username:"Ashish Singh",
    contents:"I am a SuperHero"
},
{
    id:uuidv4(),
    username:"Sudhandhu Singh",
    contents:"I am a SuperHero"
},
{
    id:uuidv4(),
    username:"Palak Singh",
    contents:"I am a SuperHero"
},

];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    let {username,contents} = req.body;
    let id= uuidv4();
    posts.push({id,username,contents});
    res.redirect("/posts");
    //res.send("post request working")
})

app.get("/posts/:id",(req,res)=>{
    let {id} =req.params;
    let post = posts.find((p)=> id===p.id)
    res.render("show.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = res.params;
    let newcontent = req.body.contents;
    let post = posts.find((p)=> id===p.id)
    posts.contents = newcontent;
    console.log(post);
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id)
    res.render("edit.ejs",{post})
    

})


app.listen(port,()=>{
    console.log("App is running on the server")
})



