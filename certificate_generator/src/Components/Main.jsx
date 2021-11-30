import React, { useState } from "react";
import undraw from "../undraw.svg";
import ScaleLoader from "react-spinners/ScaleLoader";
import logo from "../logo.png";
const Main = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const Validate = (e) => {
    if (name === "") return;
    setLoading(true);
    e.preventDefault();
    setError("");
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
        setName("");
        if (res.err) {
          setLoading(false);
          return setError(res.err);
        }
        setTimeout(() => {
          window.location.href = `http://localhost:5000/download/${res.token}`;
          setLoading(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="header">
        <div className="logo">
          {" "}
          <img src={logo} alt="" />
        </div>
        <div className="heading">CODECHEF NSEC CHAPTER</div>
      </div>
      <div
        className="preloader"
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <ScaleLoader
          color={"#4dd637"}
          height={65}
          width={12}
          radius={5}
          margin={4}
          loading={loading}
          size={250}
        />
      </div>
      <div className="pic">
        <img src={undraw} alt="" />
      </div>
      <div className="login">
        {error ? (
          <div
            style={{
              backgroundColor: "#e64543",
              padding: "12px",
              color: "white",
            }}
            role=""
          >
            <b>{error}</b>
          </div>
        ) : (
          ""
        )}

        <h4>Provide the following details to get your certificate</h4>
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Codechef Username"
            required="required"
          />
          <input type="text" name="p" placeholder="Contest Code" />
          {name ? (
            <button
              className="btn"
              type="submit"
              onClick={Validate}
              style={{ marginTop: "20px" }}
            >
              <span>Get my Certificate</span>
            </button>
          ) : (
            <button className="btn" disabled style={{ marginTop: "20px" }}>
              <span>Get my Certificate</span>
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Main;
