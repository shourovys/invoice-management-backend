// src/modules/invoice/invoice.controller.ts

import { NextFunction, Request, Response } from 'express'
import { InvoiceService } from './invoice.service'

export const InvoiceController = {
  getAllInvoicesForAgent: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userId } = req.params
      const invoices = await InvoiceService.getAllInvoicesForAgent(userId)
      res.json(invoices)
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
      const { userId, invoiceId } = req.params
      const invoice = await InvoiceService.getInvoiceById(userId, invoiceId)
      res.json(invoice)
    } catch (error) {
      next(error)
    }
  },

  updateInvoice: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, invoiceId } = req.params
      const updatedInvoice = await InvoiceService.updateInvoice(
        userId,
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
      const { userId, invoiceId } = req.params
      await InvoiceService.deleteInvoice(userId, invoiceId)
      res.json({ message: 'Invoice deleted successfully' })
    } catch (error) {
      next(error)
    }
  },
}
