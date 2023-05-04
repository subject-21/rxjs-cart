import { products as data } from "./products.json";
import { BehaviorSubject, Observable, of, reduce, map, switchMap, from, filter, toArray, scan, mergeMap, last, takeLast } from "rxjs";

interface Product {
    _id: string,
    name: string,
    price: number,
    description: string,
    limit?: number
}

export default class Cart {
    inventory: Product[] = data;
    products: Record<string, number> = {};
    products$ = new BehaviorSubject<Record<string, number>>({});
    currentProductQuantity: Observable<number>;
    currentTotalPrice: Observable<number>;

    addProduct(productID: string) {
        this.products$.next({ ...this.products$.getValue(), [productID]: 1 })
    }

    removeProduct(productID) {
        const { [productID]: a, ...rest } = this.products$.getValue();
        this.products$.next({ ...rest });
    }

    updateProductAmount(productID: string, amount: number) {
        const { [productID]: index, ...rest } = this.products$.getValue();
        this.products$.next({ ...rest, [productID]: amount })
    }

    checkout(): Observable<number> {
        const totalPrice: Observable<number> = this.totalPrice();
        this.products$.next({});
        return totalPrice;
    }

    totalPrice(): Observable<number> {
        return this.products$.pipe(
            map(products => {
                return this.inventory.reduce((acc, current) => {
                    const productValue = products[current._id];
                    return productValue ? acc + (current.price * productValue) : acc
                }, 0)
            })
        );
    }

    productQuantity() {
        return this.products$.pipe(
            map((products) => Object.values(products).reduce((acc, current) => acc + current, 0))
        )
    }
}


