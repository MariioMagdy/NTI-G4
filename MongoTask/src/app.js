
/***Node Congig */
const path=require('path')
const express = require('express')
const hbs = require('hbs')
const data = require('./ulitis/data')
let bodyParser = require('body-parser')

const app = express()
const PORT = 3000

const myPublicFiles = path.join(__dirname, '../public')
const myViewsFiles = path.join(__dirname, '../frontend/views')
const myPartialsFiles = path.join(__dirname, '../frontend/layouts')

/****Data Base config */

const {MongoClient,ObjectID} = require("mongodb")



app.set('view engine', 'hbs')
app.set('views', myViewsFiles)
hbs.registerPartials(myPartialsFiles)
app.use(express.static(myPublicFiles))
app.use(bodyParser.urlencoded()); // with html data 
// app.use(bodyParser.json()); // with api data 

function testConect(callback){
  myDbUrl="mongodb://127.0.0.1:27017"
  const dbName="Test"
  MongoClient.connect(myDbUrl,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
    if(error) return console.log(error);
    const db=client.db(dbName)
    callback(db)
})
}

app.get('',(req, res)=>{
            res.render("home")
})
app.post("/addTask",(req,res)=>{ 
 let data =req.body
    /***connect with data */
    db =testConect((db)=>{
      db.collection("users").insert(data,(err,res)=>{
          if(err) return console.log(err);
          console.log(res);
        })
    })
 

  res.redirect("/posts") 
})

app.get("/addTask",(req,res)=>{ 
 res.redirect("/posts") 
 })

app.get("/posts",(req,res)=>{
    /***connect with data */
  testConect((db)=>{
  db.collection("users").find().toArray((err,result)=>{
    if(err) res.render("error")
       res.render("posts",{data:result})
    })  
  })
})


app.get("/update/:id",(req,res)=>{
  id =req.params.id
console.log(id);

  testConect((db)=>{
    db.collection("users").findOne({_id:new ObjectID(id)},(err,data)=>{
      if(err) return console.log(err);
      // console.log(data);
      res.render("update",{update:data})   
  console.log(data);
  })
})

})
/***update method */
// app.get("/update/:id",(req,res)=>{

// console.log(id);
//   console.log(req.body);
//   testConect((db)=>{
//   db.collection("user").findAndModify(
//    ObjectID(req.params.id),
//     req.body,
//   )

// })
// res.redirect("/posts")
// })

app.get("/delete/:id",(req,res)=>{
  id =req.params.id
console.log(id);
  testConect((db)=>{
    db.collection("users").remove(
      {
         _id:ObjectID(id)
      }
    ).then((res)=>{console.log(res)}  
    ).catch((err)=>{console.log(err);})

    ;

 res.redirect("/posts")
})
})



app.listen(PORT)