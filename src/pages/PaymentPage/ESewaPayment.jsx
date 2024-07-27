import React, { useState } from 'react';

const EsewaPayment = () => {
  const [amount, setAmount] = useState('');
  const [paymentId, setPaymentId] = useState('');

  const handlePayment = () => {
    const payload = {
      amt: amount,
      psc: '0',
      pdc: '0',
      txAmt: '0',
      tAmt: amount,
      pid: paymentId,
      su: 'http://yourwebsite.com/success',
      fu: 'http://yourwebsite.com/failure',
    };

    // Create a form and submit it
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://uat.esewa.com.np/epay/main';
    
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = payload[key];
        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <h2>eSewa Payment</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Payment ID"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
      />
      <button onClick={handlePayment}>Pay with eSewa</button>
    </div>
  );
};

export default EsewaPayment;