// src/modules/invoice/invoice.route.ts

import express from 'express'
import { isAdminOrSameUser } from '../user/user.middleware'
import { InvoiceController } from './invoice.controller'

const invoiceRouter = express.Router({ mergeParams: true })

invoiceRouter.get(
  '/',
  isAdminOrSameUser,
  InvoiceController.getAllInvoicesForAgent,
)

invoiceRouter.post('/', isAdminOrSameUser, InvoiceController.createInvoice)

invoiceRouter.get(
  '/:invoiceId',
  isAdminOrSameUser,
  InvoiceController.getInvoiceById,
)

invoiceRouter.put(
  '/:invoiceId',
  isAdminOrSameUser,
  InvoiceController.updateInvoice,
)

invoiceRouter.delete(
  '/:invoiceId',
  isAdminOrSameUser,
  InvoiceController.deleteInvoice,
)

export default invoiceRouter
