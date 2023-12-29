// src/modules/invoice/invoice.controller.ts

import { NextFunction, Request, Response } from 'express'
import { UserService } from '../user/user.service'
import { InvoiceService } from './invoice.service'

export const InvoiceController = {
  getAllInvoicesForAgent: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userId } = req.params
      const { invoiceId, productName } = req.query as {
        invoiceId?: string
        productName?: string
      }
      const invoices = await InvoiceService.getAllInvoicesForAgent(
        userId,
        invoiceId,
        productName,
      )
      res.json({ data: invoices })
    } catch (error) {
      next(error)
    }
  },

  createInvoice: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params
      const invoice = await InvoiceService.createInvoice(userId, req.body)
      res.json(invoice)
    } catch (error) {
      next(error)
    }
  },

  getInvoiceById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invoiceId } = req.params
      const invoice = await InvoiceService.getInvoiceById(invoiceId)
      const agent = await UserService.getUserById(invoice?.agent.id || '')
      res.json({ data: { invoice, agent: agent } })
    } catch (error) {
      next(error)
    }
  },

  updateInvoice: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invoiceId } = req.params
      const updatedInvoice = await InvoiceService.updateInvoice(
        invoiceId,
        req.body,
      )
      res.json(updatedInvoice)
    } catch (error) {
      next(error)
    }
  },

  deleteInvoice: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invoiceId } = req.params
      await InvoiceService.deleteInvoice(invoiceId)
      res.json({ message: 'Invoice deleted successfully' })
    } catch (error) {
      next(error)
    }
  },

  getAllInvoices: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await InvoiceService.getAllInvoices(req.query)
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
}
