import React, { useEffect } from "react";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemDetails from "./components/ItemsContainer/ItemDetails/ItemDetails";
import Navbar from "./components/navbar/Navbar";
import TopNav from "./components/topnav/topnav";
import ShoppingBasket from "./components/ShoppingBasket/ShoppingBasket";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import RegisterAccount from "./components/RegisterAccount/RegisterAccount";
import Login from "./components/Login/Login";
import { auth, database } from "./components/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./redux/actions/User";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import useWindowWidth from "./customHooks/getWindowWidth";

function App() {
  const width = useWindowWidth();
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .ref("_users_/" + user.uid)
          .once("value")
          .then((snapshot) => {
            let user = snapshot.val();
            dispatch(setCurrentUser(user));
          });
      } else {
        dispatch(setCurrentUser(null));
      }
    });
  }, [dispatch]);

  const user_details = useSelector((state) => state.user);

  return (
    <div className="App">
      {width > 640 ? <TopNav email={user_details.email} /> : null}
      <Navbar email={user_details.email} />

      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/creeaza-cont" component={RegisterAccount} />
        <Route exact path="/plaseaza-comanda" component={PlaceOrder} />
        <Route exact path="/cos-cumparaturi" component={ShoppingBasket}></Route>
        <Route path="/produse/:productName" component={ItemDetails} />
        <Route path="/categorii/:categoryName" component={CategoryPage} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
