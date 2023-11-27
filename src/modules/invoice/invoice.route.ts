// src/modules/invoice/invoice.route.ts

import express from 'express'
import { InvoiceController } from './invoice.controller'

const invoiceRouter = express.Router({ mergeParams: true })

invoiceRouter.get('/', InvoiceController.getAllInvoicesForAgent)
invoiceRouter.post('/', InvoiceController.createInvoice)
invoiceRouter.get('/:invoiceId', InvoiceController.getInvoiceById)
invoiceRouter.put('/:invoiceId', InvoiceController.updateInvoice)
invoiceRouter.delete('/:invoiceId', InvoiceController.deleteInvoice)

export default invoiceRouter
