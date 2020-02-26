var express=require('express');
var path=require('path');
var serveStatic=require('serve-static');
const bodyParser=require('body-parser')
var MongoClient= require('mongodb').MongoClient
var app=express();

app.use(serveStatic(path.join(__dirname, 'public')));
app.use(bodyParser.json())

const datamongo='mongodb://travan:vantra12041996@ds245680.mlab.com:45680/star-wars-quotes'
var db//db từ csdl

MongoClient.connect(datamongo,(err, client) => {
    if(err) return console.log(err)
    db = client.db('star-wars-quotes')
})

app.get('/',function(req, res){
    res.sendFile(__dirname+'/src/index.html')
})
app.get('/quotes', function(req, res){
    db.collection('quotes').find().toArray(function(err, result){
        if(err) console.log(err)
        res.json(result)
    })
})
app.post("/quotes", function(req, res){
    db.collection('quotes').save(req.body,(err, result)=>{
        if(err) return console.log(err)
        console.log('save to database')
        res.redirect('/')
    })
})
app.put('/quotes',(req, res) => {
    db.collection('quotes').findOneAndUpdate({name:'phuc'},{
        $set:{
            name:req.body.name,
            quote: req.body.quote
        }
    },{
        sort:{_id:-1},
        upset : true
    },(err,result) => {
        if(err) return res.send(err)
        res.send(result)
    })
})
app.delete('/quotes', (req, res) => {
    db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({message: 'ahihi'})
    })
})
app.listen(8080)