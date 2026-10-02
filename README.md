# Cartwise API

A Node.js + TypeScript commerce API showcasing a practical product catalog and cart pricing rules.

## Features

- Product catalog endpoint with search
- Cart subtotal, shipping threshold, and total calculation
- Typed request models and central error handling
- Ready for a database adapter, payment provider, and authentication layer

## Run

```bash
npm install
npm run dev
```

Try `GET /products?q=keyboard` or `POST /cart/quote` with `{ "items": [{ "productId": "p1", "quantity": 2 }] }`.

## License

MIT
