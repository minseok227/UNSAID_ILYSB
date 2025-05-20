import { z } from 'zod'

export const UserInitSchema = z.object({
  name: z.string().min(1).max(20),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  instagram_username: z.string().min(3).max(30),
})

export type UserInitInput = z.infer<typeof UserInitSchema>