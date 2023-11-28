// src/modules/invoice/invoice.model.ts

import mongoose, { Document, Schema } from 'mongoose'
import { IInvoice } from './invoice.interface'

type IInvoiceModel = mongoose.Model<IInvoice & Document>

const invoiceSchema = new Schema<IInvoice>(
  {
    agent: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    product: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        code: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    sellerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      contactNumber: { type: String, required: true },
    },
    status: { type: String },
  },
  {
    timestamps: true,
  },
)

export const InvoiceModel = mongoose.model<IInvoice, IInvoiceModel>(
  'Invoice',
  invoiceSchema,
)
