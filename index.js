const express = require('express');

const app = express();

const PORT = 3000;

const loggerMiddeware = (req, res, next) => {
    let d = new Date,
        dformat = [d.getDate(),
        d.getMonth() + 1,
        d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
    next()
    let diff = new Date() - d
    console.log(`--------> ${dformat} | ${req.method}: ${req.url} | ${diff} ms`)
}

app.use('/', loggerMiddeware)

app.use('/protected', Auth)

const secretKey = 'mySecretKey'

function Auth(req,res,next) {
    let key = req.headers['authorization']
    console.log(key)
    if (key == secretKey) {
        next()
        return
    }
    res.status(401).send("Unauthorized");
}

app.get('/', (req, res) => {
    res.send("The server is running")
})

//Create
app.post('/protected/api/contact', (req, res) => {
    res.send(`${req.method}: ${req.url}`)
})

//Read
app.get('/protected/api/contact', (req, res) => {
    res.send(`${req.method}: ${req.url}`)
})

app.get('/protected/api/contact/:id', (req, res) => {
    res.send(`${req.method}: ${req.url}`)
})

//Update
app.put('/api/contact', (req, res) => {
    res.send(`${req.method}: ${req.url}`)
})

//Delete
app.delete('/api/contact/:id', (req, res) => {
    res.send(`${req.method}: ${req.url}`)
})

//Delete
app.delete('/api/blog/:id', (req, res) => {
    res.send(`${req.method}: ${req.url}`)
})

app.listen(PORT, () => {
    console.log(`Server has been started on PORT ${PORT}`)
})