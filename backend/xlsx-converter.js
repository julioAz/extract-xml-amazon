const fs = require('fs');
const xmlbuilder = require('xmlbuilder');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('dados.xlsx'); // Nome do arquivo XLSX que você deseja converter
const sheetName = workbook.SheetNames[0]; // Assumindo que você está interessado apenas na primeira planilha do arquivo XLSX
const sheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(sheet);

const xml = xmlbuilder.create('items');

for (const data of jsonData) {
  xml.ele('item')
    .ele('g:id', {}, data.id).up()
    .ele('g:title', {}, data.title).up()
    .ele('g:description', {}, data.description).up()
    .ele('g:price', {}, data.price).up()
    .ele('g:sale_price', {}, data.sale_price).up()
    .ele('g:image_link', {}, data.image_link).up()
    .ele('g:image_link', {}, data.additional_image_link).up()
    .ele('g:link', {}, data.link).up()
    .ele('g:availability', {}, data.availability).up()
    .ele('g:google_product_category', {}, data.google_product_category).up()
    .ele('g:product_type', {}, data.product_type).up()
    .ele('g:brand', {}, data.brand).up()
    .up();
}

xml.end({ pretty: true });

const xmlString = xml.toString();
fs.writeFileSync('dados.xml', xmlString);

console.log('Arquivo XML criado com sucesso!');
