import Cart from "./components/Cart";
import { CartContextProvider } from "./components/CartContext";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import OrderConfirmation from "./components/OrderConfirmation";
import { UserProgressContextProvider } from "./components/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
        <OrderConfirmation />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
