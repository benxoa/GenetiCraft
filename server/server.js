const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: ".env"})
const port = process.env.PORT
require('./db/connection')
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET} = process.env;
const base = "https://api-m.sandbox.paypal.com";


app.use(express.json({limit: '50mb'}));
app.use(cors({origin:"http://localhost:5173", credentials: true}))
const router = require('./router/Router')
app.use("/api", router)


// const generateAccessToken = async () => {
//   try {
//     if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
//       throw new Error("MISSING_API_CREDENTIALS");
//     }
//     const auth = Buffer.from(
//       PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
//     ).toString("base64");
//     const response = await fetch(`${base}/v1/oauth2/token`, {
//       method: "POST",
//       body: "grant_type=client_credentials",
//       headers: {
//         Authorization: `Basic ${auth}`,
//       },
//     });
    
//     const data = await response.json();
//     return data.access_token;
//   } catch (error) {
//     console.error("Failed to generate Access Token:", error);
//   }
// };
  
// /**
// * Create an order to start the transaction.
// * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
// */
// const createOrder = async ({ PlanName, credits, price }) => {
//   console.log(
//     "shopping plan information passed from the frontend createOrder() callback:",
//     PlanName, credits, price,
//   );
  
//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders`;
//   const payload = {
//     intent: "CAPTURE",
//     purchase_units: [
//       {
//         amount: {
//           currency_code: "USD",
//           value: price,
//         },
//       },
//     ],
//   };
  
//   const response = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,

//     },
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
  
//   return handleResponse(response);
// };
  

// const captureOrder = async (orderID) => {
//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,

//     },
//   });
  
//   return handleResponse(response);
// };
  
// async function handleResponse(response) {
//   try {
//     const jsonResponse = await response.json();
//     return {
//       jsonResponse,
//       httpStatusCode: response.status,
//     };
//   } catch (err) {
//     const errorMessage = await response.text();
//     throw new Error(errorMessage);
//   }
// }
  
// app.post("/api/orders", async (req, res) => {
//   try {
//     const { PlanName,credits,price } = req.body;
//     const { jsonResponse, httpStatusCode } = await createOrder({PlanName,credits,price});
//     res.status(httpStatusCode).json(jsonResponse);
//   } catch (error) {
//     console.error("Failed to create order:", error);
//     res.status(500).json({ error: "Failed to create order." });
//   }
// });
  
// app.post("/api/orders/:orderID/capture", async (req, res) => {
//   try {
//     const { orderID } = req.params;
//     const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
//     res.status(httpStatusCode).json(jsonResponse);
//   } catch (error) {
//     console.error("Failed to create order:", error);
//     res.status(500).json({ error: "Failed to capture order." });
//   }
// });

				
		


app.listen(port, ()=> {
    console.log(`The server listening at http://localhost:${port}`)
})
