const express = require('express');
const bodyParser = require('body-parser');
const repository = require('./repository');
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const app = express();
const port = process.env.PORT || 3000;

// Agrega credenciales
mercadopago.configure({
  access_token: "TEST-2919930627709596-092114-f805e1a4fece137291735115981fae8a-356280312",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/productos', async(req, res) => {
  res.send(await repository.read());
})

app.post("/api/pagar", async(req, res) => {
  const order = req.body;
  const ids = order.items.map(p => p.id);
  const productosCopy = await repository.read();

  // Crea un objeto de preferencia
let preference = {
  items: [],
  back_urls: {
    success: "http://localhost:3000/feedback",
    failure: "http://localhost:3000/feedback",
    pending: "http://localhost:3000/feedback",
  },
  auto_return: "approved",
};

  let error = false;
  ids.forEach((id) => {
    const producto = productosCopy.find((p) => p.id === id);
    if (producto.stock > 0) {
      producto.stock--;
      preference.items.push({
        title: producto.name,
        unit_price: producto.price,
        quantity: 1,
      })



    } else {
      error = true;
    }
  });

  if(error) {
    res.send("Out of stock").statusCode(400);
  }
  else {

    const response = await mercadopago.preferences.create(preference)    
    const preferenceId = response.body.id;
    await repository.write(productosCopy);
    order.date = new Date().toISOString();
    order.preferenceId = preferenceId;
    order.status = "pending";
    const orders = await repository.readOrders();
    orders.push(order);
    await repository.writeOrders(orders);
    res.send({preferenceId});
  }


});


app.get('/feedback', async(req, res) => {
const payment = await mercadopago.payment.findById(req.query.payment_id);
const merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
const preferenceId = merchantOrder.body.preference_id;
const status = payment.body.status;
await repository.updateOrderByPreferenceId(preferenceId, status);


res.sendFile(require.resolve("./fe/index.html"));
});

app.use("/", express.static("fe"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})