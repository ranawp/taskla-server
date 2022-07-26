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
        const taskCollection = client.db('taskla').collection('tasks');
        const reviewCollection = client.db('taskla').collection('review');
        const blogCollection = client.db('taskla').collection('blog');
        // masud code
        const answerScriptCollection = client.db('taskla').collection('answerScripts');
        const studentMarks = client.db('taskla').collection('studentMarks');
        const noticeCollection = client.db('taskla').collection('notices');

        //----------------------- masud code start-----------------------// 

        //get all users 
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

        //admin roll set 



        // hridoy 

        // Get: answerScript 
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


        // Post: Notice 
        // url: localhost:5000/notice 
        app.post('/notice', async (req, res) => {
            const data = req.body;
            const result = await noticeCollection.insertOne(data);
            res.send(result);
        })

        // get: Notice 
        // url: http://localhost:5000/notice
        app.get('/notice', async (req, res) => {
            const notice = await (await noticeCollection.find().toArray()).reverse();
            res.send(notice);
        })

        // get:announcement
        app.get('/announcement', async (req, res) => {
            const announcementData = await noticeCollection.find({}).toArray();
            res.send(announcementData);
        })

        app.get('/announcement/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const singleAnnounce = await noticeCollection.findOne(filter)
            res.send(singleAnnounce);
        })

        // end hridoy
        //Add review/Junayed 

        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })

        app.get('/review', async (req, res) => {
            const review = await reviewCollection.find().toArray();
            res.send(review);
        })
        //admin roll set
        app.put('/user/admin/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { role: 'admin' },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        //notice
        app.put('/notice/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const filter = { _id: ObjectId(id) }
            const updateDoc = {
                $set: { read: true }
            }
            const result = await noticeCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        //enrolled 
        app.put('/user/student/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { student: 'enrolled' },
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
        //-----------------------masud end-------------------------//



        //------------------ hridoy start-------------------------// 

        // Post: Notice 
        // url: localhost:5000/notice 
        app.post('/notice', async (req, res) => {
            const data = req.body;
            console.log(data);

            const result = await noticeCollection.insertOne(data);
            res.send(result);
        })

        // get: Notice 
        // url: http://localhost:5000/notice
        app.get('/notice', async (req, res) => {
            const notice = await (await noticeCollection.find().toArray()).reverse();
            res.send(notice);
        })

        //answer script // contribute with rana
        app.get('/answers', async (req, res) => {

            const answerScript = await answerScriptCollection.find().toArray();
            res.send(answerScript);
        })
        //post answer script // contribute with rana
        app.post('/answer', async (req, res) => {
            const data = req.body;
            console.log(data);

            const result = await answerScriptCollection.insertOne(data);
            res.send(result);
        })
        // ---------------------------end hridoy----------------------------//


        //-----------------rana start-------------------------------------//

        //get answers 



        //post task or assignment 
        app.post('/tasks', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask)
            res.send(result)
        });

        //get all the task in edit route  
        app.get('/alltaskEdit', async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const allTasks = await cursor.toArray();
            res.send(allTasks)
        });

        //edit task 
        app.put('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const taskEdit = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: taskEdit,
            };
            console.log(updateDoc)
            const result = await taskCollection.updateOne(filter, updateDoc);
            res.send(result);
            console.log('result', result)

        })


        //get all the task in student my task route 
        app.get('/alltasks', async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const allTasks = await cursor.toArray();
            res.send(allTasks)
        });

        //get all task in my task route 
        app.put('/alltasks/:id', async (req, res) => {
            const id = req.params.id;
            const { submit } = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: { submit: submit },
            };
            const result = await taskCollection.updateOne(filter, updateDoc);
            res.send(result);
        })
        //post answer mark by teacher 
        app.post('/studentMarks', async (req, res) => {
            const newMark = req.body;
            const mark = await studentMarks.insertOne(newMark)
            res.send(mark)
        })

        //get all the marks 
        app.get('/allMarks', async (req, res) => {
            const query = {};
            const cursor = studentMarks.find(query);
            const allMarks = await cursor.toArray();
            res.send(allMarks)
        })

        // student will get all the marks individually 
        app.get('/allMarks/:email', async (req, res) => {
            const email = req.params.email;

            const filter = { email: email };
            const users = await studentMarks.find(filter)
            const allMarks = await users.toArray();
            res.send(allMarks)
        })

        //feedback 
        // app.put('/feedbackUpdate/:email', async (req, res) => {
        //     const user = req.body;
        //     const filter = { taskSerial: email };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: user,
        //     };
        //     console.log(user)
        //     const result = await taskCollection.updateOne(filter, updateDoc);
        //     res.send(result);
        // })

        //task submitted 

        app.put('/alltasks/:id', async (req, res) => {
            const id = req.params.id;
            const { submit } = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: { submit: submit },
            };
            const result = await taskCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        //feedback submited 
        app.put('/answers/:id', async (req, res) => {
            const id = req.params.id;
            const { feedbackSubmit } = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: { feedbackSubmit: feedbackSubmit },
            };
            const result = await answerScriptCollection.updateOne(filter, updateDoc);
            res.send(result);

        })

        //--------------------rana end---------------------------------------// 


        //----------------------Junayed start ---------------------------// 
        //add review 
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })

        //get all the review 
        app.get('/review', async (req, res) => {
            const review = await reviewCollection.find().toArray();
            res.send(review);
        })
        //----------------Junayed end ---------------------------// 


        //--------------------- parvez Start--------------------------//

        //blog create 
        app.post('/createBlog', async (req, res) => {
            const newBlog = req.body;
            const result = await blogCollection.insertOne(newBlog);
            res.send(result);
        });

        //get all blogs 
        app.get('/createBlog', async (req, res) => {
            const query = {};
            const cursor = blogCollection.find(query);
            const newBlog = await cursor.toArray();
            res.send(newBlog);
        });

        //single blog details 
        app.get('/createBlog/:blogId', async (req, res) => {
            const id = req.params.blogId;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await blogCollection.findOne(query);
            res.send(result);
        });


        app.delete('/createBlog/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await blogCollection.deleteOne(query);
            res.send(result);
        });

        app.put('/createBlog/:id', async (req, res) => {
            const id = req.params.id;
            const updateBlog = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    blogTitle: updateBlog.blogTitle,
                    blogDescription: updateBlog.blogDescription
                }
            }
            const result = await blogCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })
        // parvez End

        //--------------------- parvez end--------------------------//
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