const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const cors = require('cors')

require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

//middelware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://taskla:dAKGb6kYJLfMjHHj@cluster0.k7x5vob.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const userCollection = client.db('taskla').collection('users');


        app.get('/user', async (req, res) => {
            const users = await userCollection.find().toArray()
            res.send(users)
        })
        app.get('/user/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const users = await userCollection.findOne(filter)
            res.send(users)
        })

        app.put('/user/admin/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { role: 'admin' },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })
        app.put('/user/student/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { student: 'paidStudent' },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const updateDoc = {
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.send({ result, token });
        })
        app.put('/update/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email)
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            console.log(user)
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Hello world')
})


app.listen(port, () => {
    console.log('starting express', port)
})
