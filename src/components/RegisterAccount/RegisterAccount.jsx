import React, { useState } from "react";
import "./RegisterAccount.scss";
import { auth, database } from "../firebase/firebase";

const RegisterAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    if (email !== confirmEmail) {
      setError([...error, "Adresele De Email nu coincid!"]);
    } else if (password.length < 8) {
      setError([...error, "Parola trebuie sa contina cel 8 caractere!"]);
    } else if (password !== confirmPassword) {
      setError([...error, "Parolele nu coincid!"]);
    } else {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          setError([error.message]);
          console.log(error);
        })
        .then((res) => {
          database.ref("_users_/" + res.user.uid).set({
            username: firstName + " " + lastName,
            email: email,
          });
          setFirstName("");
          setLastName("");
          setEmail("");
          setConfirmEmail("");
          setPassword("");
          setConfirmPassword("");
          setError(["Contul dvs. a fost creat cu succes!"]);
        })
        .catch((err) => {
          setError(["Adresa de email introdusa este folosita de alt cont!"]);
        });
    }
  };

  return (
    <div className="register_page" onSubmit={handleSubmit}>
      <h2>Creeare Cont</h2>
      <form className="register_form">
        <label>Nume:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label>Prenume:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <label>Adresa email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Confirma adresa email:</label>
        <input
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />

        {error.includes("Adresele De Email nu coincid!") ? (
          <p className="error">Adresele De Email nu coincid!</p>
        ) : (
          <br />
        )}
        <label>Parola:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error.includes("Parola trebuie sa contina cel 8 caractere!") ? (
          <p className="error">Parola trebuie sa contina cel 8 caractere!</p>
        ) : (
          <br />
        )}
        <label>Confirma Parola:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        {error.includes("Parolele nu coincid!") ? (
          <p className="error">Parolele nu coincid!</p>
        ) : (
          <br />
        )}

        <input type="submit" value="Creeaza cont" />
      </form>
      {error.includes("Contul dvs. a fost creat cu succes!") ? (
        <p>Contul dvs. a fost creat cu succes!</p>
      ) : null}
      {error.includes(
        "Adresa de email introdusa este folosita de alt cont!"
      ) ? (
        <p className="error">
          Adresa de email introdusa este folosita de alt cont!
        </p>
      ) : null}
      ;
    </div>
  );
};

export default RegisterAccount;
