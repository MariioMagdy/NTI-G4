const path=require('path')
const express = require('express')
const hbs = require('hbs')
const data = require('./ulitis/data')

const app = express()
const PORT = 3000

const myPublicFiles = path.join(__dirname, '../public')
const myViewsFiles = path.join(__dirname, '../frontend/views')
const myPartialsFiles = path.join(__dirname, '../frontend/layouts')

app.set('view engine', 'hbs')
app.set('views', myViewsFiles)
hbs.registerPartials(myPartialsFiles)
app.use(express.static(myPublicFiles))

app.get('', (req, res)=>{
    res.render('home')
})

app.get('/about', (req,res)=>{
    res.render('about')
})
app.get('/services', (req,res)=>{
    res.render('services')
})
app.get('/posts', (req,res)=>{
    getPosts= data.getData((err,body)=>{
        if(err) res.send(err)
        else res.render("posts",body)
        console.log(body);
        ;
    })
    
})
app.listen(PORT)