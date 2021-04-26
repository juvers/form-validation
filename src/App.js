import React from "react";

import { RegisterForm } from "./PaymentApp/payment-form";

import "./App.css";

export default function App() {
  // let [name, setName] = useState("sara");
  // let [error, setError] = useState({});

  // const updateName = (evt) => {
  //   setName(evt.target.value);
  // };

  // const onValidate = (error) => {
  //   setError(error);
  // };

  return (
    <div className="App">
      <h2>Registration Form with Validation using Hooks</h2>
      <RegisterForm />
    </div>
  );
}
