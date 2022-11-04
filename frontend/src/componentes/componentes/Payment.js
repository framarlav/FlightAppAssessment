import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../App.css";

//toast.configure();

function Payment() {
  const [product] = React.useState({
    name: "Apple iPhone SE",
    price: 42000,
    description: "Cool car"
  });

  function handleToken(token, addresses) {
    console.log({token, addresses});
  }

  return (
    <div className="container">
    {/* { <table id="customers">
      <tr>
    <th>Product Name</th>
    <th>Quantity</th>
    <th>Cart Value</th>
      </tr>
      <tr>
    <td><div className="product">{product.name}</div></td>
    <td>1</td>
    <td><p id='cp'>Checkoutprice · Rs {product.price}</p></td>
  </tr>
      </table>
         }
         */}
      <StripeCheckout
        stripeKey="pk_test_51I7PdgBbM74AXCcMdSA3zsCKKxMwsaDNiCfSi17cUu0u0HCtkfe3w0PeAj352QDqoiQlWdmLreHEzWvvQAmR3M5G00pGXTRWAC"
        token={handleToken}
        //amount={product.price * 100}
        //name="Tesla Roadster"
        //billingAddress
        //shippingAddress
      />
    </div>
  );
}

export default Payment;