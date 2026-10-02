import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
const products = [
  { id: "p1", name: "Nimbus Keyboard", price: 89.99, inventory: 18 },
  { id: "p2", name: "Orbit Mouse", price: 39.99, inventory: 35 },
  { id: "p3", name: "Halo Stand", price: 54.99, inventory: 10 }
];

app.get("/health", (_req, res) => res.json({ status: "ok", service: "cartwise" }));
app.get("/products", (req, res) => {
  const q = String(req.query.q || "").toLowerCase();
  res.json(products.filter((p) => p.name.toLowerCase().includes(q)));
});
app.post("/cart/quote", (req: Request, res: Response) => {
  const items = req.body.items as { productId: string; quantity: number }[];
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: "items are required" });
  const lines = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > product.inventory) throw new Error("Invalid cart item");
    return { productId: product.id, name: product.name, quantity: item.quantity, total: +(product.price * item.quantity).toFixed(2) };
  });
  const subtotal = +lines.reduce((sum, line) => sum + line.total, 0).toFixed(2);
  const shipping = subtotal >= 100 ? 0 : 9.99;
  res.json({ lines, subtotal, shipping, total: +(subtotal + shipping).toFixed(2) });
});
app.use((err: Error, _req: Request, res: Response, _next: unknown) => res.status(400).json({ error: err.message }));
app.listen(process.env.PORT || 3000, () => console.log("Cartwise API listening"));
