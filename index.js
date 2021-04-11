const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://rashu123:OqdJWR40pME2t81z@cluster0.djl2y.mongodb.net/ema-john?retryWrites=true&w=majority`;
require('dotenv').config()
const app = express()

app.use(bodyParser.json())
app.use(cors())




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("ema-john").collection("products");
    app.post('/addProducts',(req, res)=>{
        const products = req.body
        productsCollection.insertMany(products)
        .then(result => {
            res.send(result.insertedCount>0)
        })
        
    })
    app.get('/products',(req,res) => {
        productsCollection.find({})
        .toArray((err, document)=>{
            res.send(document)
        })
    })
    app.get('/product/:key',(req,res) => {
        const key = req.params.key
        productsCollection.find({key})
        .toArray((err, document)=>{
            console.log(document)
            res.send(document[0])
        })
    })
    app.post('/productsByKeys',(req,res)=>{
        const keys = req.body
        productsCollection.find({key: {$in: keys}})
        .toArray((err, documents)=>{
            res.send(documents)
        })
    })
});

client.connect(err => {
    const productsCollection = client.db("ema-john").collection("orders");

    app.post('/order', (req, res) =>{
        console.log(req.body)
    })

})




app.listen(process.env.PORT|| 5000 )