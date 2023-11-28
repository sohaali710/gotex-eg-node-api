const mongoose = require('mongoose');

mongoose.set('strictQuery', true);// changed to strictQuery=false by default in Mongoose version 7.0 

exports.dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)
        return conn
    }
    catch (err) {
        console.error('Database error: ' + err);
        process.exit(1);
    }
};
