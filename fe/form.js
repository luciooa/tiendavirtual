const express = require('express');
const bodyParser = require('body-parser');
const repository = require('./repository');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/productos', async(req, res) => {
  res.send(await repository.read());
})

app.post("/api/pagar", async(req, res) => {
  const ids = req.body;
  const productosCopy = await repository.read();

  let error = false;
  ids.forEach((id) => {
    const producto = procutosCopy.find((p) => p.id === id);
    if (producto.stock > 0) {
      producto.stock--;
    } else {
      error = true;
    }
  });

  if(error) {
    res.send("Out of stock").statusCode(400);
  }
  else {
    await repository.write(productosCopy);
    res.send(productosCopy);
  }


});

app.use("/", express.static("fe"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})