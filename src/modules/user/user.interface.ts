// src/modules/user/user.interface.ts
export interface IUser {
  id: string
  no: number
  name: string
  password: string
  email: string
  role: 'admin' | 'agent'
  contactNumber: string
  createdAt: Date
  updatedAt: Date
}
