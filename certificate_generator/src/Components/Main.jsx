import React, { useState } from "react";
import download from "downloadjs";
const Main = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const Validate = () => {
    fetch("http://localhost:5000/get_certificate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setError(res.error);
        setTimeout(() => {
          window.location.href = `http://localhost:5000/download/${res.token}`;
        }, 100);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <input
        type="text"
        placeholder="Enter Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {name ? (
        <button onClick={Validate}>Button</button>
      ) : (
        <button disabled>Button</button>
      )}
    </>
  );
};

export default Main;
