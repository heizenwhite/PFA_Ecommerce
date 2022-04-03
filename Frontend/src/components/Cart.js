import '../styles/Cart.css'

function Cart() {
    const mouse = 8;
    const keyboard = 10;
    const headset = 15;
    return (
        <div className="cart">
            <h2>Panier</h2>
            <ul>
                <li>Mouse dial Jumia : {mouse}€</li>
                <li>Keyboard mn sou9 larbe3 : {keyboard}€</li>
                <li>Headset dial Wish : {headset}€</li>
            </ul>
            Total : {mouse + keyboard + headset}€
        </div>
    );
}

export default Cart;
