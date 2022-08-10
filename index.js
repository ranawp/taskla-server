const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const cors = require('cors')

require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middelware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://taskla:dAKGb6kYJLfMjHHj@cluster0.k7x5vob.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const userCollection = client.db('taskla').collection('users');
<<<<<<< HEAD
        const taskCollection = client.db('taskla').collection('tasks')

        // masud code
=======
        const taskCollection = client.db('taskla').collection('tasks');
>>>>>>> ef2d2f72d8bf64d8247a1554d36f81e080269ad8
        const answerScriptCollection = client.db('taskla').collection('answerScripts');


        // masud code start 
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

<<<<<<< HEAD
        // Get:answerScript 
        // url: http://localhost:5000/answers 
        app.get('/answers', async (req, res) => {

            const answerScript = await answerScriptCollection.find().toArray();
            res.send(answerScript);
        })


        // POST: answerScript submit
        // url: localhost:5000/answer
        app.post('/answer', async (req, res) => {
            const data = req.body;
            console.log(data);

            const result = await answerScriptCollection.insertOne(data);
            res.send(result);
        })

        //END answerScript submit

=======
        //admin roll set 
>>>>>>> ef2d2f72d8bf64d8247a1554d36f81e080269ad8
        app.put('/user/admin/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { role: 'admin' },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        //enrolled 
        app.put('/user/student/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { student: 'enrolled' },
<<<<<<< HEAD
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })
        app.put('/user/enroll/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { enroll: "enrollPending" },
=======
>>>>>>> ef2d2f72d8bf64d8247a1554d36f81e080269ad8
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        //enroll pending 
        app.put('/user/enroll/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { enroll: "enrollPending" },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        //view profile  
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

        //edit profile 
        app.put('/update/:email', async (req, res) => {
            const email = req.params.email;
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
        //masud code end



        // POST: answerScript submit
        // url: localhost:5000/answer
        app.post('/answer', async (req, res) => {
            const data = req.body;
            console.log(data);

            const result = await answerScriptCollection.insertOne(data);
            res.send(result);
        })

        // Get:answerScript 
        // url: http://localhost:5000/answers 
        app.get('/answers', async (req, res) => {

            const answerScript = await answerScriptCollection.find().toArray();
            res.send(answerScript);
        })

        app.get('/answers/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const users = await answerScriptCollection.findOne(filter)
            res.send(users)
        })

        //END answerScript submit

        //rana start 
        app.post('/tasks', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask)
            res.send(result)
        })

        app.get('/alltasks', async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const allTasks = await cursor.toArray();
            res.send(allTasks)
        })

        //answer mark and feedback update

        app.put('/feedbackUpdate/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            console.log(user)
            const result = await answerScriptCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.put('/answerSubmission/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: updateUser,
            };
            console.log(updateUser)
            const result = await taskCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        //rana end
    }
    finally {

    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Hello world this is from taskla server')
})


app.listen(port, () => {
    console.log('starting express', port)
})