import type { FlatObject } from '../interfaces';

export function flatObject(object: FlatObject) {
    return Object.keys(object).reduce(
        (total, current) => {
            if (typeof object[current] === 'object') {
                Object.assign(total, flatObject(object[current]));
            } else {
                total[current] = object[current];
            }
            return total;
        },
        {} as FlatObject,
    );
}
