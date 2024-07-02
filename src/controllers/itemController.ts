import { Context } from 'hono'
import {
  createItemSchema,
  deleteItemSchema,
  getItemSchema,
  updateItemSchema,
} from '../validators/itemValidator'
import { create, getById, remove, update } from '../models/item'

export const createItem = async (c: Context) => {
  try {
    const body = await c.req.json()
    const parsedBody = createItemSchema.parse(body)

    const result = await create(parsedBody)

    return c.json({
      message: 'Item created successfully',
      id: result.insertedId,
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
}

export const getItemById = async (c: Context) => {
  try {
    const params = await c.req.param('id')
    const parsedParams = getItemSchema.parse(params)

    const result = await getById(parsedParams)

    return c.json(result)
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
}

export const updateItemById = async (c: Context) => {
  try {
    const body = await c.req.json()
    const parsedBody = updateItemSchema.parse(body)

    const result = await update(parsedBody)

    return c.json({
      message: 'Item updated successfully',
      id: result?._id,
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
}

export const removeById = async (c: Context) => {
  try {
    const params = await c.req.param('id')
    const parsedParams = deleteItemSchema.parse(params)

    const result = await remove(parsedParams)

    return c.json({
      message: 'Item deleted successfully',
      id: result?._id,
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
}
