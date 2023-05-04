import Cart from "./cart";
const myCart = new Cart();

myCart.products$.subscribe(x => console.log("products: "+JSON.stringify(x)))

myCart.productQuantity().subscribe({
    next: x=> console.log(`product quantity: ${x}`),
    error: x=> console.log(`error: ${x}`),
    complete: ()=> console.log(`complete: `)
});

myCart.totalPrice().subscribe(x=> console.log(`the total price: ${x}`))

function testAddProduct(productID: string) {
    myCart.addProduct(productID);
}

function testRemoveProduct(productID: string) {
    myCart.removeProduct(productID)
}
function testUpdateProductAmount(productID: string, amount: number) {
    myCart.updateProductAmount(productID, amount);
}

function testCheckout() {
    myCart.checkout()
}

testAddProduct("34245264444")
testAddProduct("342452342342")
testUpdateProductAmount("34245264444", 3)
testAddProduct("342452633333")
testRemoveProduct("34245264444")
testCheckout()

