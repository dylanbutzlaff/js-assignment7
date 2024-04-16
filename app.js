
const express = require('express')
const apiRoutes = require('./api-routes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/todos', apiRoutes)

app.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})

app.listen(port, () => console.log(`Server running: http://localhost:${port}`))