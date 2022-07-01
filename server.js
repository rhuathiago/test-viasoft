const express = require('express')
const mysql = require('mysql')

const routes = require('./routes')

const port = 3000

const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'test',
})

const app = express()

app.use('/routes', routes)

connection.connect(function (error) {
    if (error) {
        console.log(error)
    }
    console.log('Conectou ao MYSQL!')

    app.listen(port, () => {
        console.log(`O server está rodando na porta ${port}`)
    })
})