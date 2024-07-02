import { Hono } from 'hono'
import {
  createItem,
  getItemById,
  removeById,
  updateItemById,
} from '../controllers/itemController'

const items = new Hono()

items.post('/', createItem)
items.get('/:id', getItemById)
items.put('/', updateItemById)
items.delete('/:id', removeById)

export default items
