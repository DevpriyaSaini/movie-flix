const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const movierouter=require("./route/movie.js")

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port=8000;
app.use(cors());

app.use("/",movierouter);
  

mongoose.connect("mongodb+srv://devpriyasaini:Anilsaini70177@cluster01.kzupp.mongodb.net/Cluster01")
.then(()=>console.log('mongo connected sucessfully'))
.catch((err)=>console.log("mongo err",err));

app.listen(port,()=>console.log(`server is running at ${port}`));