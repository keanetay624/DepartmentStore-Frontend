import SalesItemData from '../assets/DataInterface'

function createData(
      id: number,
      InvoiceNo: string,
      StockCode: string,
      Description: string,
      Quantity: number,
      InvoiceDate: string,
      UnitPrice: number,
      CustomerId: number,
      Country: string
  ): SalesItemData {
    return {
      id,
      InvoiceNo,
      StockCode,
      Description,
      Quantity,
      InvoiceDate,
      UnitPrice,
      CustomerId,
      Country
    };
  }

  const sampleSalesItemData:SalesItemData[] = [
    // createData(1,'536365', '85123A', 'WHITE HANGING HEART T-LIGHT HOLDER', 67, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(2,'536365', '71053', 'WHITE METAL LANTERN', 51, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(3,'536365', '84406B', 'CREAM CUPID HEARTS COAT HANGER', 24, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(4,'536365', '84029G', 'KNITTED UNION FLAG HOT WATER BOTTLE', 24, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(5,'536365', '84029E', 'RED WOOLLY HOTTIE WHITE HEART.', 49, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(6,'536365', '22752', 'SET 7 BABUSHKA NESTING BOXES', 87, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(7,'536365', '21730', 'GLASS STAR FROSTED T-LIGHT HOLDER', 37, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(8,'536365', '22633', 'HAND WARMER UNION JACK', 94, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(9,'536365', '22632', 'HAND WARMER RED POLKA DOT', 65, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(10,'536365', '84879', 'ASSORTED COLOUR BIRD ORNAMENT', 98, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(11,'536365', '22745', "POPPY'S PLAYHOUSE BEDROOM ", 81, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(12,'536365', '22748', "POPPY'S PLAYHOUSE KITCHEN ", 9, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
    // createData(13,'536365', '22749', 'FELTCRAFT PRINCESS CHARLOTTE DOLL', 63, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  ];

  export default sampleSalesItemData