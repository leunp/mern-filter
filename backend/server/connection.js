import {MongoClient, ServerApiVersion} from 'mongodb';
const uri = "mongodb+srv://leungpetercs:1fuMoTlgHVTqhLbp@cluster0.mog3d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

try {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch(err) {
  console.error(err)
}

let db = client.db("sample_data");

export default db;