export default () =>({
    database:{
        connectionString: process.env.CONNECTION_STRING
    },

    jwt:{
        secretKey: process.env.SECRET_KEY
    }
})