import SalesItemData from "../../../assets/DataInterface"

export default function getSalesItemsArray(salesItems:any): SalesItemData[] {
    let salesItemsArray:SalesItemData[] = []

    salesItems.results.map((item: any) => {
        const currentItem: SalesItemData = {
          id: item.id,
          InvoiceNo: item.invoiceNo,
          InvoiceDate: item.invoiceDate,
          StockCode: item.stockCode,
          Description: item.description,
          UnitPrice: item.unitPrice,
          CustomerId: item.customerId,
          Quantity: item.quantity,
          Country: item.country
        }
        salesItemsArray.push(currentItem)
      })
    return salesItemsArray
}
    