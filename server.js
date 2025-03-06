import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "sk_sbox_v3xxm6vjru2gtmoidtey2xk5eus";

app.post("/create-payment-sessions", async (_req, res) => {
  try {
    const response = await fetch(
      "https://api.sandbox.checkout.com/payment-sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 6540,
          currency: "GBP",
          reference: "ORD-123A",
          description: "Payment for Guitars and Amps",
          processing_channel_id: "pc_dp5zvtaq6veundn7ocv7dl5rmu",
          billing: {
            address: {
              address_line1: "123 High St.",
              country: "GB",
            },
            phone: {
              number: "1234567890",
              country_code: "+44",
            },
          },
          "3ds": {
            enabled: true,
          },
          success_url: "http://localhost:5173/?status=succeeded",
          failure_url: "http://localhost:5173/?status=failed",
        }),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error creating payment session", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
