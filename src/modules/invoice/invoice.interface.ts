// src/modules/invoice/invoice.interface.ts

import { IUser } from '../user/user.interface'

export interface IInvoice {
  id: string
  agentId: IUser['id']
  product: {
    name: string
    code: string
    description: string
    price: number
    quantity: number
  }[]
  sellerInfo: {
    name: string
    email: string
    contactNumber: string
  }
  status: string
  createdAt: Date
  updatedAt: Date
}
