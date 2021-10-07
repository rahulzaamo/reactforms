import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { Styles } from "./style";

// import saveData from "./some_other_file";

const GENERATE_OTP = gql`
  mutation GenerateOtp($mobileNo: String!) {
    generateOtp(mobileNo: $mobileNo) {
      success
      accountErrors {
        message
      }
    }
  }
`;

function Form() {
  // const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [generateOtp, { data, loading, error }] = useMutation(GENERATE_OTP);

  const [mobileNo, setMobileNo] = useState("");

  const handleChange = (event) => {
    setMobileNo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateOtp();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Otp Validation</label>
      <input
        name="Otp"
        value={mobileNo}
        onChange={handleChange}
        className="form-field"
      />

      <button type="submit" className="form-field">
        Generate Otp
      </button>
    </form>
  );
}

export default function App() {
  return (
    <Styles>
      <Form />
    </Styles>
  );
}
