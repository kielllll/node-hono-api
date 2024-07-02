import { Hono } from 'hono'
import {
  createItem,
  getItemById,
  removeById,
  updateItemById,
} from '../src/controllers/itemsController'
import { client, connectDB } from '../src/utils/db'
import { MongoMemoryServer } from 'mongodb-memory-server'

describe('items CRUD', () => {
  let mongoServer: MongoMemoryServer
  let createdItemId = ''

  const app = new Hono()
  app.get('/', (c) => {
    return c.text('Hello!')
  })
  app.post('/api/items', createItem)
  app.get('/api/items/:id', getItemById)
  app.put('/api/items', updateItemById)
  app.delete('/api/items/:id', removeById)

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    process.env.MONGO_URI = uri
    await connectDB()
  })

  afterAll(async () => {
    client.close()
    await mongoServer.stop()
  })

  it('should invoke the base endpoint properly', async () => {
    const response = await app.request('/')

    expect(response.status).toBe(200)
  })

  describe('create', () => {
    it('should add an item to the database', async () => {
      const response = await app.request('/api/items', {
        method: 'POST',
        body: JSON.stringify({ name: 'Test Item', price: 10 }),
        headers: { 'Content-Type': 'application/json' },
      })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.message).toBe('Item created successfully')
      expect(data.id).toBeDefined()
      createdItemId = data.id
    })

    it('should return error for invalid input', async () => {
      const response = await app.request('/api/items', {
        method: 'POST',
        body: JSON.stringify({ name: '', price: -10 }),
        headers: { 'Content-Type': 'application/json' },
      })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })
  })

  describe('read', () => {
    it('should return the created item from the database', async () => {
      const response = await app.request(`/api/items/${createdItemId}`, {
        method: 'GET',
      })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data).toBeDefined()
    })

    it('should return an error for empty input', async () => {
      const response = await app.request(`/api/items/`, {
        method: 'GET',
      })

      expect(response.status).toBe(404)
    })

    it('should return an error for non-existing record', async () => {
      const response = await app.request(`/api/items/hahahahahahahaha`, {
        method: 'GET',
      })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })
  })

  describe('update', () => {
    it('should update the created item', async () => {
      const response = await app.request('/api/items', {
        method: 'PUT',
        body: JSON.stringify({
          id: createdItemId,
          name: 'Test Item 2',
          price: 15,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.message).toBe('Item updated successfully')
      expect(data.id).toBeDefined()
    })

    it('should return an error for invalid input', async () => {
      const response = await app.request('/api/items', {
        method: 'PUT',
        body: JSON.stringify({
          id: createdItemId,
          name: '',
          price: -15,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })

    it('should return an error for non-existing record', async () => {
      const response = await app.request('/api/items', {
        method: 'PUT',
        body: JSON.stringify({
          id: 'hahahahahahaha',
          name: 'Test Item 3',
          price: 25,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })
  })

  describe('delete', () => {
    it('should delete the created item', async () => {
      const response = await app.request(`/api/items/${createdItemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.message).toBe('Item deleted successfully')
      expect(data.id).toBeDefined()
    })

    it('should return an error for non-existing record', async () => {
      const response = await app.request(`/api/items/hahahahahahaha`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBeDefined()
    })
  })
})
