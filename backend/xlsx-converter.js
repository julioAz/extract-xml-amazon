const fs = require('fs');
const xmlbuilder = require('xmlbuilder');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('dados.xlsx'); // Nome do arquivo XLSX que você deseja converter
const sheetName = workbook.SheetNames[0]; // Assumindo que você está interessado apenas na primeira planilha do arquivo XLSX
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet);

const xml = xmlbuilder.create('items');

for (const data of jsonData) {
  const item = xml.ele('item');

  item.ele('g:id', {}, `<![CDATA[${data.id}]]>`).up()
    .ele('g:title', {}, `<![CDATA[${data.title}]]>`).up()
    .ele('g:description', {}, `<![CDATA[${data.description}]]>`).up()
    .ele('link', {}, `<![CDATA[${data.link}]]>`).up()
    .ele('g:image_link', {}, `<![CDATA[${data.image_link}]]>`).up();

  // Verificar se additional_image_link é uma string antes de tentar iterar sobre ela
  if (typeof data.additional_image_link === 'string') {
    item.ele('g:additional_image_link', {}, `<![CDATA[${data.additional_image_link}]]>`).up();
  } else if (Array.isArray(data.additional_image_link)) {
    // Se additional_image_link for um array, incluir cada link adicional
    data.additional_image_link.forEach(additionalImageLink => {
      item.ele('g:additional_image_link', {}, `<![CDATA[${additionalImageLink}]]>`).up();
    });
  }

  item.ele('g:condition', {}, 'New').up()
    .ele('g:availability', {}, 'in stock').up()
    .ele('g:price', {}, `${data.price} BRL`).up()
    .ele('g:sale_price', {}, `${data.sale_price} BRL`).up()
    .ele('g:google_product_category', {}, `<![CDATA[${data.google_product_category}]]>`).up()
    .ele('g:product_type', {}, `<![CDATA[${data.product_type}]]>`).up()
    .ele('g:brand', {}, `<![CDATA[${data.brand}]]>`).up()
    .ele('g:gtin', {}, `<![CDATA[${data.gtin}]]>`).up();
}

xml.end({ pretty: true });

const xmlString = xml.toString();
fs.writeFileSync('dados.xml', xmlString);

console.log('Arquivo XML criado com sucesso!');
