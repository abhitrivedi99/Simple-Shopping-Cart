const http = require('http');
const fs = require('fs');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const slugs = productData.map(el => slugify(el.productName, { lower : true}));
console.log(slugs);

//server
const server = http.createServer((req, res) => {
    
    const {query, pathname} = url.parse(req.url, true);

    //overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type' : 'text/html'});
        
        const cardsHtml = productData.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    //about page
    }else if (pathname === '/about'){
        res.end("It's ABOUT page.");

    //product page
    }else if (pathname === '/product'){
        res.writeHead(200, {'Content-type' : 'text/html'});
        const product = productData[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    //api page
    }else if (pathname === '/api'){

        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            const productData = JSON.parse(data);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(data);
        });

    //Not found   
    }else{
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-header' : 'this page not found'
        });
        res.end('<h1>Page not found</h1>');
    }
    
});

server.listen(3000, 'localhost', () => {
    console.log('Server is up');
});
