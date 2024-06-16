import express from 'express';

import PRODUCTS from './products.ts';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: any, res: any) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Shop</title>
        <link rel="stylesheet" href="/main.css">
         <script src="https://unpkg.com/htmx.org@1.9.12" integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2" crossorigin="anonymous"></script>
      </head>
      <body>
        <header id="main-header">
          <div id="main-title">
            <a href="/">
              <img src="/logo.png" alt="Elegant model" />
              <h1>Elegant Clothing</h1>
            </a>
          </div>
        </header>
        <main id="shop">
          <h2>Elegant Clothing For Everyone</h2>

          <ul id="products">
            ${PRODUCTS.map(
        (product) => `
              <article class="product">
                <a hx-get="/products/${product.id}" hx-target="body" hx-push-url="/products/${product.id}">
                  <img src="/images/${product.image}" alt="${product.title}" />
                  <div class="product-content">
                    <h3>${product.title}</h3>
                    <p class="product-price">$${product.price}</p>
                  </div>
                </a>
              </article>
            `
    ).join('')}
          </ul>
        </main>
      </body>
    </html>
  `);
});

app.get('/products/:id', (req: any, res: any) => {
    const product = PRODUCTS.find((product) => product.id === req.params.id);

    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${product?.title}</title>
        <link rel="stylesheet" href="/main.css">
       <script src="https://unpkg.com/htmx.org@1.9.12" integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2" crossorigin="anonymous"></script>
      </head>
      <body>
        <header id="main-header">
          <div id="main-title">
            <a href="/">
              <img src="/logo.png" alt="Elegant model" />
              <h1>Elegant Clothing</h1>
            </a>
          </div>
        </header>
        <main id="product">
          <header>
            <img src="/images/${product?.image}" alt="${product?.title}">
            <div>
              <h1>${product?.title}</h1>
              <p id="product-price">$${product?.price}</p>
              <form method="post" action="/cart">
                <button>Add to Cart</button>
              </form>
            </div>
          </header>
          <p id="product-description">${product?.description}</p>
        </main>
      </body>
    </html>
  `);
});

app.listen(3000);
