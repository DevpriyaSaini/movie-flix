const mongoose=require("mongoose");
const express=require("express");
const router=express.Router()
const moviemodel=require("../models/movie.js");
const BASE_URL = "https://image.tmdb.org/t/p/w500";
router.post("/movies",async(req,res)=>{
    console.log("req.body",req.body);
    try {
        const{searchterm,movie_id,poster_url,vote_average,release_date }=req.body;
        const exsistmovie=await moviemodel.findOne({searchterm:searchterm});
        if(exsistmovie){
            await moviemodel.findOneAndUpdate({searchterm:searchterm},{$set:{movie_id:movie_id,count:exsistmovie.count+1,poster_url:poster_url}},{new:true})
            res.json({message:"movie updated sucessfully"})
        }
        else{
            const newmovie=new moviemodel({
                searchterm:searchterm,
                movie_id:movie_id,
                count:1,
                poster_url:`${BASE_URL}${poster_url}`,
                 vote_average,
                  release_date 

            })
            await newmovie.save();
          console.log("new movie");
            res.json({message:"new movie added sucessfully"})
        }
    } catch (error) {
        console.log("error in movie post api",error);
        return res.json({message:"errror in movie post api",error:error.message})
    }
})

router.get("/gettop", async (req, res) => {
  try {
    const result = await moviemodel.find().sort({ count: -1 }).limit(10);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching top movies",
      error: error.message,
    });
  }
});

module.exports=router;