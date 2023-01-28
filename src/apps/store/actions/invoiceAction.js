import { FETCH_ALL_INVOICE, SELECTED_INVOICE, SELECTED_INVOICE_SPBU } from "../constants/invoiceConstant";
  
  export function listenToAllInvoices(invoices) {
    return {
      type: FETCH_ALL_INVOICE,
      payload: invoices,
    };
  }
  export function listenToSelectedInvoice(invoice) {
    return {
      type: SELECTED_INVOICE,
      payload: invoice,
    };
  }
  export function listenToSelectedInvoicesSPBU(invoices) {
    return {
      type: SELECTED_INVOICE_SPBU,
      payload: invoices,
    };
  }