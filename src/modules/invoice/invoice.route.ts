// src/modules/invoice/invoice.route.ts

import express from 'express'
import { isAdminOrSameUser } from '../user/user.middleware'
import { InvoiceController } from './invoice.controller'

const invoiceRouter = express.Router({ mergeParams: true })

// New route for admin --> all invoices action
invoiceRouter.get('/all', InvoiceController.getAllInvoices)

invoiceRouter.get('/', InvoiceController.getAllInvoicesForAgent)

invoiceRouter.post('/', isAdminOrSameUser, InvoiceController.createInvoice)

invoiceRouter.get('/:invoiceId', InvoiceController.getInvoiceById)

invoiceRouter.put('/:invoiceId', InvoiceController.updateInvoice)

invoiceRouter.delete('/:invoiceId', InvoiceController.deleteInvoice)

export default invoiceRouter
