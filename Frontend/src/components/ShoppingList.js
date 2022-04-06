const productList = [
    'mouse',
    'keyboard',
    'headset',
    'monitor',
    'gpu'
]

function ShoppingList() {
    return (
        <ul>
            {productList.map((product) => (
                <li>{product}</li>
            ))}
        </ul>
    )
}

export default ShoppingList