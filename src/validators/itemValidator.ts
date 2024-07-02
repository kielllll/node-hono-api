import { z } from 'zod'

export const createItemSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name should not be more than 50 characters'),
  price: z.number().positive(),
})

export const getItemSchema = z.string().min(1, 'ID is required')

export const updateItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z
    .string()
    .min(1, 'Name is requried')
    .max(50, 'Name should not be more than 50 characters'),
  price: z.number().positive('Price should not be negative'),
})

export const deleteItemSchema = z.string().min(1, 'ID is required')
