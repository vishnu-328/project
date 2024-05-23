import React, { useState } from 'react';
import styles from './input.module.css'
import axios from 'axios';

const CheckoutForm = () => {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [productName, setProductName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('https://stripe-gg3x.onrender.com/api/create-checkout-session', {
        product_name: productName,
        amount: amount,
        email: email,
        quantity: 1
      });

      console.log(data);

      if (data.success) {
        window.open(data?.data?.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  return (
    <div className={styles.checkout_form_container} >
      <h2 style={{color : 'black'}}>Payment</h2>
      <form onSubmit={handleSubmit} className={styles.checkout_form} >
        <div className="form-group">
          <label htmlFor="Name">Name:</label>
          <input
            id="Name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className= {styles.form_group}>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className= {styles.form_group}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
