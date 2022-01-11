//include modules
const { MongoClient } = require('mongodb');

//connection uri
const uri = 'mongodb+srv://admin:Gret4Mnc@petproject.fcmaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let collection;

//criete new Mongo client
const client = new MongoClient(uri);

//connect to mongoDB
async function run(){
    try{
        await client.connect();
        await client.db('pet_db').collection('users').find().toArray();
    } finally{
        await client.close();
    }
}

run().catch(console.dir);
console.log(collection)