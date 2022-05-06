const express = require('express');
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard')
const verifyToken = require('./routes/validate-token')
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const corsOptions={
    origin: "*",
    optionsSuccessStatus: 200
}

const app = express()
const uri=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.busc9.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const PORT =  process.env.PORT || 3001

require('dotenv').config()

mongoose.connect(uri, options)
    .then( ()=> console.log('Conexion Satisfactoria:))))'))
    .catch( (e)=> console.log('Error' + e))

//Forma de capturar el Body en las peticiones
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(cors(corsOptions))
app.use('/api/user', authRoutes)
app.use('/api/dashboard', verifyToken, dashboardRoutes)
app.get('/', (req, res)=>
{
    res.json({
        estado:true,
        mensaje: 'WOOORKS!!!!'
    })
})

//iniciar el servidor 
app.listen(PORT, ()=>{
    console.log(`Servidor trabajando: ${PORT}`)
})
