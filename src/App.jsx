import React, { useState, useEffect } from "react";

const PUBLIC_KEY = process.env;

const App = () => {
  const [paymentSession, setPaymentSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "424242424242",
    expiryMonth: "03",
    expiryYear: "25",
    cvv: "234",
  });

  console.log("paymentSession", paymentSession);

  useEffect(() => {
    const createPaymentSession = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/create-payment-sessions",
          {
            method: "POST",
          }
        );
        const data = await response.json();
        setPaymentSession(data);
        console.log("Payment Session:", data);
      } catch (error) {
        console.error("Error creating payment session", error);
      }
    };

    createPaymentSession();
  }, []);

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setMessage("Payment processing...");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Checkout.com Payment POC</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          value={cardDetails.number}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="expiryMonth"
          placeholder="Expiry Month (MM)"
          value={cardDetails.expiryMonth}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="expiryYear"
          placeholder="Expiry Year (YYYY)"
          value={cardDetails.expiryYear}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={cardDetails.cvv}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
