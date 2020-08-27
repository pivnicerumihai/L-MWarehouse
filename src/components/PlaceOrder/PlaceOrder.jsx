import React, { useState } from "react";
import "./PlaceOrder.scss";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const basket = useSelector((state) => state.shop);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [errors, setError] = useState([]);

  const handle_submit = (e) => {
    e.preventDefault();
    setError([]);
    if (firstName.length < 2) {
      setError((errors) => [
        ...errors,
        "Va rugam sa introduceti un nume valid",
      ]);
    } else if (lastName.length < 2) {
      setError((errors) => [
        ...errors,
        "Va rugam sa introduceti un prenume valid",
      ]);
    } else if (address_1.length < 10) {
      setError((errors) => [
        ...errors,
        "Adresa dumneavoastra trebuie sa contina cel putin 10 caractere",
      ]);
    } else if (city.length < 2) {
      setError((errors) => [
        ...errors,
        "Va rugam sa introduceti numele localitatii",
      ]);
    } else if (county.length < 2) {
      setError((errors) => [
        ...errors,
        "Va rugam sa introduceti numele judetului",
      ]);
    } else if (postalCode.length === 0) {
      setError((errors) => [...errors, "Va rugam introduceti codul postal"]);
    } else if (phoneNumber.length < 9) {
      setError((errors) => [...errors, "Numar de telefon nu este valid"]);
    } else {
      window.Email.send({
        SecureToken: "f28f2933-df8f-4c00-bbcf-ed3a6123713f",
        To: `${emailAddress}`,
        From: "lucif.store.ro@gmail.com",
        Subject: `Comanda Lucif Store `,
        Body:
          `Stimate ${firstName} ${lastName}, <br/>
      Comanda dumneavoastra a fost finalizata. <br/>
      In urmatoarele 24 de ore veti primi un email de confirmare cu numarul AWB pentru curier.
    <br/>
      Detaliile comenzii dumneavoastra le puteti gasi mai jos:
      <br/>
      <h3>Nume</h3> ${firstName} ${lastName}<br/>
      <h3>Adresa</h3> ${address_1}  ${address_2}<br/>
      <h3>Localitate<h3/> ${city}<br/>
      <h3>Judet</h3> ${county}<br/>
      <h3>Cod postal</h3> ${postalCode}<br/>
      <h3>Numar Telefon</h3># ${phoneNumber}<br/>
      <h2>Produse Comandate</h2>:
        ` +
          basket.items.map((el) => {
            return `<h4>${el.name} X ${basket.counts[el.name]}</h4> Pret: ${
              el.price * basket.counts[el.name]
            }  RON <br/>`;
          }) +
          `
       <h3> Pret Livrare</h3> 25 RON<br/>
       <h2> Pret Total</h2>: ${basket.totalPrice} RON`,
      }).then((message) => {
        alert(
          `Comanda dumneavoastra a fost finalizata. Veti primi confirmare la adresa de email ${emailAddress}. Va rugam sa verificati si folderul Spam. `
        );
        window.Email.send({
          SecureToken: "f28f2933-df8f-4c00-bbcf-ed3a6123713f",
          To: `lucif.store.ro@gmail.com`,
          From: "lucif.store.ro@gmail.com",
          Subject: `Comanda Noua`,
          Body:
            `Comanda Urmatoare a fost creata : <br/>
          <h3>Nume</h3> ${firstName} ${lastName}<br/>
          <h3>Adresa</h3> ${address_1}  ${address_2}<br/>
          <h3>Localitate<h3/> ${city}<br/>
          <h3>Judet</h3> ${county}<br/>
          <h3>Cod postal</h3> ${postalCode}<br/>
          <h3>Numar Telefon</h3># ${phoneNumber}<br/>
          <h2>Produse Comandate</h2>:
          ` +
            basket.items.map((el) => {
              return `<h4>${el.name}</h4> Pret: ${el.price} RON <br/>`;
            }) +
            `
       <h3> Pret Livrare</h3> 25 RON<br/>
       <h2> Pret Total</h2>${basket.totalPrice} RON`,
        });
      });
    }
  };

  return (
    <div className="place_order">
      <form className="place_order_form" onSubmit={handle_submit}>
        <h2>Detalii facturare</h2>
        <div className="name_inputs">
          <div>
            <label>Nume: </label>
            <br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label> Prenume: </label>
            <br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <label>Adresa:</label>
        <input
          className="single_input"
          type="text"
          placeholder="Nume strada si numar casa"
          value={address_1}
          onChange={(e) => setAddress_1(e.target.value)}
        />
        <input
          className="single_input"
          type="text"
          placeholder="Apartament, complex, unitate etc.(Optional)"
          value={address_2}
          onChange={(e) => setAddress_2(e.target.value)}
        />
        <br />
        <label>Localitate:</label>
        <input
          className="single_input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <label>Judet:</label>
        <input
          type="text"
          className="single_input"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        />
        <br />
        <label>Cod Postal:</label>
        <input
          type="text"
          className="single_input"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <br />
        <div className="contact_inputs">
          <div>
            <label>Telefon:</label>
            <br />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label>Adresa de email</label>
            <br />
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
        </div>
        <br />
        <label style={{ color: "white" }}>
          <input type="radio" defaultChecked />
          &nbsp; Numerar la livrare
        </label>
        <br />
        <input type="submit" value="Finalizare Comanda"></input>
      </form>
      {errors.length > 0 ? <h3>{errors}</h3> : null}
      <div className="order_details">
        <h2>Comanda dvs.</h2>
        <table>
          <tbody>
            <tr>
              <td style={{ fontSize: "20px" }}>
                <b>Produs</b>
              </td>
              <td style={{ fontSize: "20px" }}>
                <b>Total</b>
              </td>
            </tr>
            {basket.items.map((el, i) => {
              return (
                <tr key={i}>
                  <td>{el.name}</td>
                  <td>{el.price} RON</td>
                </tr>
              );
            })}
            <tr>
              <td>
                <b>Subtotal: </b>
              </td>
              <td>
                <b>
                  <b>{basket.totalPrice}</b>
                </b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Livrare:</b>
              </td>
              <td>
                <b>25 RON</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Total:</b>
              </td>
              <td>{basket.totalPrice + 25} RON</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaceOrder;
