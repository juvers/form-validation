import React, { useReducer, useRef } from "react";

import { Validation, Validator, ValidationHelper } from "./validation";
import { creditCardRegex, emailRegex, phoneRegex } from "./form-regex";

const initialFrom = () => ({
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
  address: "",
  phoneNumber: "",
  creditCard: "",
});

const formReducer = (state, action) => {
  let newValue = {};
  newValue[action.name] = action.value;
  return Object.assign({}, state, newValue);
};

const errorReducer = (allError, error) => {
  return Object.assign({}, allError, error);
};

export function RegisterForm() {
  let validationRef = useRef(null);

  let [form, dispatch] = useReducer(formReducer, {}, initialFrom);
  let [error, dispatchError] = useReducer(errorReducer, {});

  const handleChange = ({ target }) => {
    dispatch({
      name: target.name,
      value: target.value,
    });
  };

  const onValidate = (err) => {
    dispatchError(err);
  };

  const submitForm = () => {
    validationRef.current.validate();
    console.log("Inside form", form);
  };

  const numberValidation = (value) => {
    return isNaN(value.trim()) ? "Value should be number" : "";
  };

  const phoneNumberValidation = (value) => {
    return phoneRegex.test(value.trim()) ? "" : "Invalid phone number";
  };

  const emailValidation = (value) => {
    return emailRegex.test(value.trim()) ? "" : "Invalid Email Address";
  };

  const creditCardValidation = (value) => {
    return creditCardRegex.test(value.trim()) ? "" : "Invalid Credit Card";
  };

  return (
    <div className="registerForm">
      <h4>Register Form</h4>
      <Validation ref={validationRef}>
        <InputControl>
          <label htmlFor="">First Name</label>
          <Validator
            name="firstName"
            value={form.firstName}
            validations={[ValidationHelper.required("FirstName is required")]}
            onValidate={onValidate}
          >
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </Validator>
          {error.firstName && <span className="error">{error.firstName}</span>}
        </InputControl>
        <InputControl>
          <label htmlFor="">Last Name</label>
          <Validator
            name="lastName"
            value={form.lastName}
            validations={[ValidationHelper.required("LastName is required")]}
            onValidate={onValidate}
          >
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </Validator>
          {error.lastName && <span className="error">{error.lastName}</span>}
        </InputControl>
        <InputControl>
          <label htmlFor="">Email</label>
          <Validator
            name="email"
            value={form.email}
            validations={[
              ValidationHelper.required("Email is required"),
              emailValidation,
            ]}
            onValidate={onValidate}
          >
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Validator>
          {error.email && <span className="error">{error.email}</span>}
        </InputControl>
        <InputControl>
          <label htmlFor="">Credit card</label>
          <Validator
            name="creditCard"
            value={form.creditCard}
            validations={[
              ValidationHelper.required("Credit card is required"),
              creditCardValidation,
            ]}
            onValidate={onValidate}
          >
            <input
              type="text"
              name="creditCard"
              value={form.creditCard}
              onChange={handleChange}
            />
          </Validator>
          {error.creditCard && (
            <span className="error">{error.creditCard}</span>
          )}
        </InputControl>
        <InputControl>
          <label htmlFor="">Age</label>
          <Validator
            name="age"
            value={form.age}
            validations={[
              ValidationHelper.required("Age is required"),
              numberValidation,
            ]}
            onValidate={onValidate}
          >
            <input
              type="text"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
          </Validator>
          {error.age && <span className="error">{error.age}</span>}
        </InputControl>
        <InputControl>
          <label htmlFor="">Phone Number</label>
          <Validator
            name="phoneNumber"
            value={form.phoneNumber}
            validations={[
              ValidationHelper.required("phoneNumber is required"),
              phoneNumberValidation,
            ]}
            onValidate={onValidate}
          >
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </Validator>
          {error.phoneNumber && (
            <span className="error">{error.phoneNumber}</span>
          )}
        </InputControl>
      </Validation>
      <button onClick={submitForm}>Submit</button>
    </div>
  );
}

function InputControl(props) {
  return <div className="input-control" {...props} />;
}
