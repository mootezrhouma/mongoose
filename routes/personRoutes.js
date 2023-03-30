const express = require ('express')
const router = express.Router()
const person = require ("../models/personSchema")

// Create and Save a Record of a Model:
router.post("/newPerson", (req,res)=>{
    let newPerson = new person (req. body) 
    newPerson.save((err,data)=>{
        if (err) throw err 
        else res.send(data)
    })
})

// Create Many Records with model.create()
router.post("/newManyPerson", (req,res)=>{
    person.create(req.body)
    .then((data)=>res.json(data))
    .catch((err)=>res.status(500).json(err));
})

//Use model.find() by name
router.get("/getPerson/:name",(req,res)=>{
    person.find({name:req.params.name},
        (err,data)=>{
        if (err) throw err
        else res.json(data)
    })
})

//Use model.findOne() by food
router.get("/getOnePerson/:favoriteFoods",(req,res)=>{
    person.findOne({favoriteFoods:req.params.favoriteFoods},
        (err,data)=>{
        if (err) throw err
        else res.json(data)
    })
})

// Use model.findById()
router.get("/getIdPerson/:id",(req,res)=>{
    person.findById({_id:req.params.id},req.body,(err,data)=>{
        if (err) throw err
        else res.json(data)
    })
})

// Updates by Running Find, Edit, then Save
router.put("/person/UpdateById/:id",(req,res)=>{
    person.findByIdAndUpdate({_id:req.params.id},{...req.body},(err,data)=>{
        if (err) throw err
        else res.json(req.body)
    })
})

// Perform New Updates on a Document Using model.findOneAndUpdate()
router.put("/person/UpdateByName/:name",(req,res)=>{
    person.findOneAndUpdate({name:req.params.name},{...req.body},(err,data)=>{
        if (err) throw err
        else res.json(req.body)
    })
})

// Delete One Document Using model.findByIdAndRemove
router.delete("/person/remove/:id",(req,res)=>{
    person.findByIdAndRemove({_id:req.params.id},{...req.body},(err,data)=>{
        if (err) throw err
        else res.json(req.body)
    })
})

//Chain Search Query Helpers to Narrow Search Results
router.get('/NarrowSearch',(req,res)=>{
    person.find({favoriteFoods:"burritos"})
    .sort({name : 1})
    .limit(2)
    .select("-age")
    .exec((err, data)=> {
        if(err){ console.log(err)
            res.json({msg:'error'})
        }else{
            res.json(data)
        }})
    })

module.exports= router