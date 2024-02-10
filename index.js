require('dotenv').config()
const app = require('./app')
const port = process.env.PORT || 4000
const hostname = '127.0.0.1'

// Home Page Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello Everyone. This is Inventory Management System.')
})

// Undifined Routes
app.use((req, res) => {
    res.status(404).send('404 !!! Page not found.')
})

// Server Error 
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

//   Server Running
app.listen(port, hostname, () => {
    console.log(`Server running Successfull at http://${hostname}:${port}`)
})
