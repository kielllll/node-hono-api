import { Hono } from 'hono'
import {
  createItem,
  getItemById,
  removeById,
  updateItemById,
} from '../controllers/itemController'

const items = new Hono()

items.post('/items', createItem)
items.get('/items/:id', getItemById)
items.put('/items', updateItemById)
items.delete('/items/:id', removeById)

export default items
