var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/cliente")
            .then(conn => global.conn = conn.db("banco_mongo"))
            .catch(err => console.log(err))



function findAll(callback){
    global.conn.collection("cliente").find({}).toArray(callback);
}


function insert(customer, callback){
    global.conn.collection("cliente").insert(customer, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){
    global.conn.collection("cliente").find(new ObjectId(id)).toArray(callback);
}

function update(id, customer, callback){
    global.conn.collection("cliente").replaceOne({_id:new ObjectId(id)}, customer, callback);
}

function deleteOne(id, callback){
    global.conn.collection("cliente").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne }
