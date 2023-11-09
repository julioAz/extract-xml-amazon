const fs = require('fs');
const cheerio = require('cheerio');
const xmlbuilder = require('xmlbuilder');
const axios = require('axios');

const links = [
  'https://www.amazon.com.br/HEINZ-Maionese-Heinz-215g/dp/B07YN9X2HN',
  'https://www.amazon.com.br/HEINZ-Maionese-Heinz-390g/dp/B07YN9ZY5D',
  'https://www.amazon.com.br/HEINZ-Mostarda-Heinz-255g/dp/B07YN9SQR9'
];

// Função para processar os links e criar o XML
const processLinks = async (links) => {
  // Inicializar um objeto que conterá todos os dados dos produtos
  const productsData = [];

  for (const link of links) {
    try {
      const response = await axios.get(link);
      const html = response.data;
      const dados = getDataFromHtml(html);

      // Adicionar os dados do produto ao array
      productsData.push(dados);
    } catch (error) {
      console.error(`Erro ao acessar a página HTML (${link}):`, error);
    }
  }

  // Criar o XML usando os dados formatados de todos os produtos
  const xml = xmlbuilder.create('items');
  for (const data of productsData) {
    xml.ele('item')
      .ele('g:id', {}, data.id).up()
      .ele('g:title', {}, data.title).up()
      .ele('g:description', {}, data.description).up()
      .ele('g:price', {}, data.price).up()
      .ele('g:sale_price', {}, data.sale_price).up()
      .ele('g:image_link', {}, data.image_link).up()
      .ele('g:link', {}, data.link).up()
      .ele('g:availability', {}, data.availability).up()
      .ele('g:google_product_category', {}, data.google_product_category).up()
      .ele('g:product_type', {}, data.product_type).up()
      .ele('g:brand', {}, data.brand).up()
      .up();
  }
  xml.end({ pretty: true });

  const xmlString = xml.toString();


  // Escrever o XML em um arquivo chamado 'dados.xml'
  fs.writeFileSync('dados.xml', xmlString);
  console.log('Arquivo XML criado com sucesso!');
};

  const getDataFromHtml = (html) => {
    const $ = cheerio.load(html);
  
    var skuIdArray = $("link[rel=canonical]").attr("href").split('/');
    var skuId = skuIdArray[skuIdArray.length - 1];
    var productName = $('#productTitle').text().trim();
    var productDescription = $('#productDescription').text().trim();
    var productPrice = $(".apexPriceToPay .a-offscreen").text().trim();
    var mainImage = $(".maintain-height.selected img").attr("src");

  
    var productURL = $("link[rel=canonical]").attr("href");
    var productAvailabilityString = $('#availability').text().trim();
    var productAvailability = productAvailabilityString.includes('Em estoque');
    var productBrand = $('.po-brand td:last-child span').text().trim();
  
    var productCategory = [];
    $('#wayfinding-breadcrumbs_feature_div ul li:not(.a-breadcrumb-divider)').each(function () {
      productCategory.push($(this).text().trim());
    });
    var productCategoryString = productCategory.join(' > ');
  
    // Retornar os dados como um objeto
    return {
      id: skuId,
      title: productName,
      description: productDescription,
      price: productPrice,
      sale_price: productPrice,
      image_link: mainImage,
      link: productURL,
      availability: productAvailability,
      product_type: productCategoryString,
      brand: productBrand
    };
  };

// Chamar a função para processar os links
processLinks(links);