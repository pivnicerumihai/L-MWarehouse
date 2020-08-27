import React, { useState } from "react";
import "./Login.scss";
import { auth } from "../firebase/firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    setError([]);
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res) {
          history.push("/");
        }
      })
      .catch((error) => {
        setError([error.message]);
      });
  };

  return (
    <div className="login_page" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <form className="login_form">
        <label>Adresa email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Parola:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Login" />
      </form>
      {error.length > 0 ? (
        <p className="error">
          {"Exista o greseala in detaliile contului dvs."}
        </p>
      ) : null}
      <p className="forgot_password">
        Ai uitat parola? Click aici pentru a reseta parola!
      </p>
    </div>
  );
};

export default Login;
