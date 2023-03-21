import { productComparator } from '../productComparator';
import type { SortBy, Product, Category } from '../../types';

const productMockInexpensive: Product = {
    id: 1,
    name: 'Наушники',
    description: 'Беспроводные наушники',
    price: 10000,
    category: 'Электроника',
}
const productMockExpensive: Product = {
    id: 2,
    name: 'Диван',
    description: 'Красный кожаный диван',
    price: 200000,
    category: 'Для дома',
}

describe('Тест функции productComparator', () => {
    it('Сортировка по умолчанию', () => {
        const sortedBy: SortBy = 'по умолчанию';

        expect(productComparator(sortedBy)(productMockInexpensive, productMockExpensive)).toEqual(0);
    });

    it('Сортировка по возрастанию цены уже отсортированных товаров', () => {
        const sortedBy: SortBy = 'по возрастанию цены';
        const expected = -1;

        expect(productComparator(sortedBy)(productMockInexpensive, productMockExpensive)).toEqual(expected);
    });

    it('Сортировка по возрастанию цены не отсортированных товаров', () => {
        const sortedBy: SortBy = 'по возрастанию цены';
        const expected = 1;
        
        expect(productComparator(sortedBy)(productMockExpensive, productMockInexpensive)).toEqual(expected);
    });

    it('Сортировка по убыванию цены уже отсортированных товаров', () => {
        const sortedBy: SortBy = 'по убыванию цены';
        const expected = -1;

        expect(productComparator(sortedBy)(productMockExpensive, productMockInexpensive)).toEqual(expected);
    });

    it('Сортировка по убыванию цены не отсортированных товаров', () => {
        const sortedBy: SortBy = 'по убыванию цены';
        const expected = 1;

        expect(productComparator(sortedBy)(productMockInexpensive, productMockExpensive)).toEqual(expected);
    });

    it('Сортировка при одинаковой цене', () => {
        const sortedBy: SortBy = 'по убыванию цены';

        expect(productComparator(sortedBy)(productMockExpensive, productMockExpensive)).toEqual(0);
    });

    it('Сортировка при разных валютах', () => {
        const sortedBy: SortBy = 'по возрастанию цены';
        const expected = 1;
        const productIn$: Product = {
            ...productMockExpensive,
            priceSymbol: '$',
        };
        const productInRub: Product = {
            ...productMockExpensive,
            priceSymbol: '₽',
        };
        
        expect(productComparator(sortedBy)(productIn$, productInRub)).toEqual(1);
    });
});
