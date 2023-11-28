// src/modules/invoice/invoice.service.ts

import { IApiQueryParamsBase } from '../../type'
import { UserModel } from '../user/user.model'
import { IInvoice } from './invoice.interface'
import { InvoiceModel } from './invoice.model'

interface IAllUserQuery extends IApiQueryParamsBase {
  invoiceId?: string
  productName?: string
  agentId?: string
  agentName?: string
  sellerName?: string
}

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
    query: IAllUserQuery,
  ): Promise<{ data: IInvoice[]; count: number }> => {
    const {
      offset = 0,
      limit = 10,
      sort_by = 'createdAt',
      order = 'asc',
      invoiceId,
      productName,
      agentId,
      agentName,
      sellerName,
    } = query

    const filter: Record<string, unknown> = {}

    if (invoiceId) {
      filter._id = invoiceId
    }

    if (productName) {
      filter['product.name'] = { $regex: new RegExp(`${productName}`, 'i') }
    }

    if (agentId) {
      filter['agent.id'] = agentId
    }

    if (agentName) {
      filter['agent.name'] = { $regex: new RegExp(agentName, 'i') }
    }

    if (sellerName) {
      filter['sellerInfo.name'] = { $regex: new RegExp(`${sellerName}`, 'i') }
    }

    const sortDirection = order === 'asc' ? 1 : -1

    const [invoices, count] = await Promise.all([
      InvoiceModel.find(filter)
        .sort({ [sort_by]: sortDirection })
        .skip(offset)
        .limit(limit)
        .exec(),
      InvoiceModel.countDocuments().exec(),
    ])

    return { data: invoices, count }
  },
}
