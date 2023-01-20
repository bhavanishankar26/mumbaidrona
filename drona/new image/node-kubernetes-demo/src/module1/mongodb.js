const { MongoClient } = require('mongodb');

const GetConnectionString = () => {
    return `mongodb://${process.env.DHQ_MONGODB_USER}:${process.env.DHQ_MONGODB_PASSWORD}@${process.env.DHQ_MONGODB_HOST}:${process.env.DHQ_MONGODB_PORT}`;
}

const GetConnection = async () => {
    return await new MongoClient(GetConnectionString()).connect();
}

module.exports = {
    GetConnection
}
