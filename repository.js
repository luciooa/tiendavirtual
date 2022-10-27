const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: './your-secret-key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: "v4", auth: auth });

async function read() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "1aV9yiFSI0m38eCJgS_dCwNEyeMgyrA5-0nRAYXrOPEM",
    range: "Productos!A2:F",
  });

  const rows = response.data.values;
  const productos = rows.map((row) => ({
    id: +row[0],
    name: row[1],
    price: +row[2],
    image: row[3],
    stock: +row[4],
    category: row[5],
  }));

  return productos;
}

async function write(productos) {
  let values = productos.map((p) => [p.id, p.name, p.price, p.image, p.stock, p.category]);

  const resource = {
    values,
  };
  const result = await sheets.spreadsheets.values.update({
    spreadsheetId: "1aV9yiFSI0m38eCJgS_dCwNEyeMgyrA5-0nRAYXrOPEM",
    range: "Productos!A2:F",
    valueInputOption: "RAW",
    resource,
  });
}

async function writeOrders(orders) {
  let values = orders.map((order) => [
    order.date,
    order.preferenceId,
    order.shipping.name,
    order.shipping.email,
    JSON.stringify(order.items),
    JSON.stringify(order.shipping),
    order.status,
  ]);

  const resource = {
    values,
  };
  const result = await sheets.spreadsheets.values.update({
    spreadsheetId: "1aV9yiFSI0m38eCJgS_dCwNEyeMgyrA5-0nRAYXrOPEM",
    range: "Orders!A2:G",
    valueInputOption: "RAW",
    resource,
  });
}

async function readOrders() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "1aV9yiFSI0m38eCJgS_dCwNEyeMgyrA5-0nRAYXrOPEM",
    range: "Orders!A2:G",
  });

  const rows = response.data.values || [];
  const orders = rows.map((row) => ({
    date: row[0],
    preferenceId: row[1],
    name: row[2],
    email: row[3],
    items: JSON.parse(row[4]),
    shipping:JSON.parse(row[5]),
    status: row[6],
  }));

  return orders;
}

async function updateOrderByPreferenceId(preferenceId,status) {
  const orders = await readOrders();
  const order = orders.find(o => o.preferenceId === preferenceId);
  order.status = status;
  await writeOrders(orders);
}

module.exports = {
  read,
  write,
  readOrders,
  updateOrderByPreferenceId,
  writeOrders,
};
