const { from, of, map, switchMap, filter, interval, pluck, reduce } = require('rxjs');
const products$ = of({ "123": 2, "321": 3 });

products$.pipe(
    map((products) => {
        const [key] = Object.keys(products);
        return products[key]
    }),
    reduce((acc, current) => acc + current, 0)
)

products$.subscribe(x => console.log(x))