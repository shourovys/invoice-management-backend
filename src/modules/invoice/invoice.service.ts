// src/modules/invoice/invoice.service.ts

import { IInvoice } from './invoice.interface'
import { InvoiceModel } from './invoice.model'

export const InvoiceService = {
  getAllInvoicesForAgent: async (agentId: string): Promise<IInvoice[]> => {
    return InvoiceModel.find({ agentId }).exec()
  },

  createInvoice: async (
    agentId: string,
    invoiceData: IInvoice,
  ): Promise<IInvoice> => {
    const invoice = new InvoiceModel({ ...invoiceData, agentId })
    return invoice.save()
  },

  getInvoiceById: async (
    agentId: string,
    invoiceId: string,
  ): Promise<IInvoice | null> => {
    return InvoiceModel.findOne({ _id: invoiceId, agentId }).exec()
  },

  updateInvoice: async (
    agentId: string,
    invoiceId: string,
    updatedData: Partial<IInvoice>,
  ): Promise<IInvoice | null> => {
    return InvoiceModel.findOneAndUpdate(
      { _id: invoiceId, agentId },
      updatedData,
      { new: true },
    ).exec()
  },

  deleteInvoice: async (agentId: string, invoiceId: string): Promise<void> => {
    await InvoiceModel.findOneAndDelete({ _id: invoiceId, agentId }).exec()
  },

  getAllInvoices: async (): Promise<IInvoice[]> => {
    return InvoiceModel.find().exec()
  },
}
