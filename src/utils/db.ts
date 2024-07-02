import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_URI || ''
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export const connectDB = async () => {
  await client.connect()

  return client.db('node-hono-api-cluster-1')
}
