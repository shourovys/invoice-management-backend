// src/modules/invoice/invoice.middleware.ts

import { NextFunction, Request, Response } from 'express'
import { InvoiceModel } from './invoice.model'

export const invoiceMiddleware = {
  checkInvoiceOwnership: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const invoice = await InvoiceModel.findById(req.params.invoiceId)

      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' })
      }

      if (invoice.agentId.toString() !== req.params.agentId) {
        return res.status(403).json({
          message: 'You do not have permission to perform this action',
        })
      }

      next()
    } catch (error) {
      next(error)
    }
  },
}
