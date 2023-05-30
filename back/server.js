const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
dotenv.config();
const Db =process.env.Db_url
mongoose.connect(Db, {useNewUrlParser:true})

const BizproSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    about:{
        type:String,
        require:true
    },
})

const Bizpro=mongoose.model("bizpro", BizproSchema);

const app=express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/bizpro", async (req,res)=>{
 try {
        const getBiz = await Bizpro.find({});
    res.send(getBiz)   
    } catch (err) {
        res.status(500)({message:err})
    }
});
app.post("/bizpro",  (req,res)=>{
 try {  
            const post=req.body
        const postBiz = new  Bizpro(post);
         postBiz.save()
        res.send(postBiz)
        
    } catch (err) {
        res.status(500)({message:err})
    }
});
app.delete("/bizpro/:id", async (req,res)=>{
 try { 
    const del=req.params.id
        const delBiz = await Bizpro.findByIdAndDelete(del);
    res.send(delBiz)
        
    } catch (err) {
        res.status(500)({message:"Not exist"})
    }
});
app.get("/bizpro/:id", async (req,res)=>{
 try { 
    const Id=req.params.id
        const findBiz = await Bizpro.findById(Id);
    res.send(findBiz)
        
    } catch (err) {
        res.status(500)({message:err})
    }
})

const Port=process.env.Port;
app.listen(Port, ()=>{
    console.log(`Server is op on Port:${Port}`);
})