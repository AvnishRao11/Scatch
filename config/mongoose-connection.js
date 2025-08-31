const mongoose=require("mongoose");
const config=require('config');
const debugr=require('debug')("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/Scatch`)
.then(function(){
    debugr("Connected");
})
.catch(function(err){
    debugr(err);
});


module.exports=mongoose.connection;