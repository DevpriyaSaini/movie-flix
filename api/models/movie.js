const mongoose=require("mongoose");

const MovieSchema=new mongoose.Schema({
    searchterm:String,
    movie_id:String,
    count:Number,
    poster_url:String,
     vote_average:Number,
      release_date:String,

})

const moviemodel = mongoose.models.movie || mongoose.model("movie", MovieSchema);
module.exports=moviemodel;