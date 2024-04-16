
const router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
	await client.connect()
	return client.db(dbName).collection(collectionName)
}
// GET /api/todos
router.get('/', async (request, response) => {
    const collection = await getCollection('todo-api', 'todos')
    const todos = await collection.find().toArray()
    response.send(todos)
})
// POST /api/todos
router.post('/', async (request, response) => {
	const { body } = request
	const { id, item, complete } = body
    const todo = { id, item, complete }

    const collection = await getCollection('todo-api', 'todos')
    const result = await collection.insertOne(todo)
	response.send(result)
})
// PUT /api/todos/:id
router.put('/:id', async (request, response) => {
	const { params } = request
    const { id } = params
    

    const collection = await getCollection('todo-api', 'todos')
    const todo = await collection.findOne({ _id: new ObjectId(id) })
    const complete = !todo.complete
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } })
    response.send(result)
})	

module.exports = router
