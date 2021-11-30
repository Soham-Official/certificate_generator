import React, { useState } from "react";
import download from "downloadjs";
import undraw from "../undraw.svg";
import logo from "../logo.png";
const Main = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const Validate = (e) => {
    e.preventDefault();
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
    <div className="header">
    <div className="logo"> <img src={logo} alt="" /> 
    </div>
    <div className="heading">
    CODECHEF NSEC CHAPTER
    </div>
    </div>
    <div className="pic">
      <img src={undraw} alt="" />
    </div>
    <div className="login">
	<h4>Provide the following details to get your certificate</h4>
    <form>
    	<input type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} placeholder="codechef id" required="required" />
        <input type="text" name="p" placeholder="Contest Code" required="required" />
        {name ? (
        <button className="btn" type="submit" onClick={Validate}><span>Get my Certificate</span></button>
      ) : (
        <button className="btn" disabled><span>Get my Certificate</span></button>
      )}
        </form>
       
</div>
      
	

      
    </>
  );
};

export default Main;
