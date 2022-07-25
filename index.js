const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

//middelware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xywq3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    const collection = client.db("test").collection("devices");

    console.log('connected')
    // perform actions on the collection object
    client.close();
});

app.get('/', (req, res) => {
    res.send('Hello world')
})


app.listen(port, () => {
    console.log('starting express', port)
})
