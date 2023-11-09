// Extrair informações da página da Amazon
var skuIdArray = document.querySelector("link[rel=canonical]").getAttribute("href").split('/');
var skuId = skuIdArray[skuIdArray.length -1];
var productName = document.title.trim();
var productDescription = document.querySelector('#productDescription').textContent.trim();
var productPrice = document.querySelector(".apexPriceToPay .a-offscreen").textContent.trim().split('\n');
var mainImage = document.querySelector(".maintain-height.selected img").getAttribute("src");
var productURL = window.location.href;
var productAvailabilityString = document.querySelector("#availability").textContent.trim();
var productAvailability = productAvailabilityString == 'Em estoque' ? true : false;
var productBrand = document.querySelector('.po-brand td:last-child span').textContent.trim()

var ulBreadCrumb = document.querySelector("#wayfinding-breadcrumbs_feature_div ul")
// Seleciona todas as <li> dentro da <ul>
var liElements = ulBreadCrumb.querySelectorAll('li');
// Filtra as <li> que não têm classe
var liWithoutClass = Array.from(liElements).filter(function(li) {
    return !li.classList.length;
});
var productCategory = []
// Itera sobre as <li> encontradas
liWithoutClass.forEach(function(li) {
    productCategory.push(li.textContent.trim()); // Exibe o texto da <li>
});
var productCategoryString = productCategory.toString()



// Montar o XML no padrão do Google Merchant
var xml = `<?xml version="1.0" encoding="UTF-8"?>
<item>
    <g:id>${skuId}</g:id>
    <g:title>${productName}</g:title>
    <g:description>${productDescription}</g:description>
    <g:price>${productPrice}</g:price>
    <g:sale_price>${productPrice}</g:sale_price>
    <g:image_link>${mainImage}</g:image_link>
    <g:link>${productURL}</g:link>
    <g:availability>${productAvailability}</g:availability>
    <g:google_product_category>??</g:google_product_category>
    <g:product_type>${productCategoryString}</g:product_type>
    <g:brand>${productBrand}</g:brand>
</item>`;

// Exibir o XML no console
console.log(xml);