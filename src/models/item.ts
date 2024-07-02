import { ObjectId } from 'mongodb'
import { connectDB } from '../utils/db'

export interface Item {
  id: string
  name: string
  price: number
}

export async function create(args: Omit<Item, 'id'>) {
  const db = await connectDB()

  return await db.collection('items').insertOne(args)
}

export async function getById(id: string) {
  const db = await connectDB()
  const o_id = new ObjectId(id)

  return await db.collection('items').findOne({
    _id: o_id,
  })
}

export async function update(args: Item) {
  const { id, ...rest } = args
  const db = await connectDB()
  const o_id = new ObjectId(id)

  return await db.collection('items').findOneAndUpdate(
    {
      _id: o_id,
    },
    {
      $set: {
        ...rest,
      },
    }
  )
}

export async function remove(id: string) {
  const db = await connectDB()
  const o_id = new ObjectId(id)

  return await db.collection('items').findOneAndDelete({
    _id: o_id,
  })
}
