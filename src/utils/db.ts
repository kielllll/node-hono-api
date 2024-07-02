import { MongoClient, ServerApiVersion } from 'mongodb'

const uri =
  'mongodb+srv://eatarranza:JN2ZTgAqz35huWY6@node-hono-api-cluster-1.sqw9ufw.mongodb.net/?appName=node-hono-api-cluster-1'
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
