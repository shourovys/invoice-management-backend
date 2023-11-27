// src/modules/invoice/invoice.service.ts

import { UserModel } from '../user/user.model'
import { IInvoice } from './invoice.interface'
import { InvoiceModel } from './invoice.model'

export const InvoiceService = {
  getAllInvoicesForAgent: async (
    agentId: string,
    invoiceId?: string,
    productName?: string,
  ): Promise<IInvoice[]> => {
    const query: Record<string, unknown> = { 'agent.id': agentId }

    if (invoiceId) {
      query._id = invoiceId
    }

    if (productName) {
      query['product.name'] = { $regex: new RegExp(`^${productName}$`, 'i') }
    }

    return InvoiceModel.find(query).exec()
  },

  createInvoice: async (
    agentId: string,
    invoiceData: IInvoice,
  ): Promise<IInvoice> => {
    // Fetch the agent's name using the agentId
    const agent = await UserModel.findById(agentId).exec()

    if (!agent) {
      throw new Error('Agent not found')
    }

    const { name: agentName } = agent

    // Add agentId and agentName to the invoice data
    const invoiceWithAgent = {
      ...invoiceData,
      agent: {
        id: agentId,
        name: agentName,
      },
    }

    const invoice = new InvoiceModel(invoiceWithAgent)
    return invoice.save()
  },

  getInvoiceById: async (invoiceId: string): Promise<IInvoice | null> => {
    return InvoiceModel.findOne({ _id: invoiceId }).exec()
  },

  updateInvoice: async (
    invoiceId: string,
    updatedData: Partial<IInvoice>,
  ): Promise<IInvoice | null> => {
    return InvoiceModel.findOneAndUpdate({ _id: invoiceId }, updatedData, {
      new: true,
    }).exec()
  },

  deleteInvoice: async (invoiceId: string): Promise<void> => {
    await InvoiceModel.findOneAndDelete({
      _id: invoiceId,
    }).exec()
  },

  getAllInvoices: async (
    invoiceId?: string,
    productName?: string,
    agentId?: string,
    agentName?: string,
    sellerName?: string,
  ): Promise<IInvoice[]> => {
    const query: Record<string, unknown> = {}

    if (invoiceId) {
      query._id = invoiceId
    }

    if (productName) {
      query['product.name'] = { $regex: new RegExp(`${productName}`, 'i') }
    }

    if (agentId) {
      query['agent.id'] = agentId
    }

    if (agentName) {
      query['agent.name'] = { $regex: new RegExp(agentName, 'i') }
    }

    if (sellerName) {
      query['sellerInfo.name'] = { $regex: new RegExp(`${sellerName}`, 'i') }
    }

    return InvoiceModel.find(query).exec()
  },
}
