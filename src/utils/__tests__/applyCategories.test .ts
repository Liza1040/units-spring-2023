import { applyCategories } from '../applyCategories';
import type { Category, Product } from '../../types';

const productsMockHeadphones: Product = {
    id: 1,
    name: 'Наушники',
    description: 'Беспроводные наушники',
    price: 10000,
    category: 'Электроника',
}
const productsMockSofa: Product = {
    id: 2,
    name: 'Диван',
    description: 'Красный кожаный диван',
    price: 200000,
    category: 'Для дома',
}
const productsMockDress: Product = {
    id: 3,
    name: 'Платье',
    description: 'Летнее шифоновое платье',
    price: 5000,
    category: 'Одежда',
}

describe('Тест функции applyCategories', () => {
    it.each([
        [[productsMockHeadphones, productsMockSofa, productsMockDress], ['Электроника'], [
            {
                ...productsMockHeadphones
            }] as Product[]],
        [[productsMockHeadphones, productsMockSofa, productsMockDress], ['Для дома', 'Еда'], [
            {
                ...productsMockSofa
            }] as Product[]]
    ])('Выбор товаров, удовлетворяющих одной категории', (products, categoriesMock, expected) => {
        const categories: Category[] = categoriesMock as Category[];

        expect(applyCategories(products, categories)).toEqual(expected);
    });

    it.each([
        [[productsMockHeadphones, productsMockSofa, productsMockDress], ['Электроника', 'Для дома'], [
            {
                ...productsMockHeadphones,
            },
            {
                ...productsMockSofa
            }] as Product[]],
        [[productsMockHeadphones, productsMockSofa, productsMockDress], ['Для дома', 'Еда', 'Одежда'], [
            {
                ...productsMockSofa
            },
            {
                ...productsMockDress
            }] as Product[]]
    ])('Выбор товаров, удовлетворяющих нескольким категориям', (products, categoriesMock, expected) => {
        const categories: Category[] = categoriesMock as Category[];

        expect(applyCategories(products, categories)).toEqual(expected);
    });

    it('Выбор товаров, если не выбрана ни одна категория', () => {
        const categories: Category[] = [];

        expect(applyCategories([productsMockHeadphones, productsMockSofa, productsMockDress], categories)).toEqual([productsMockHeadphones, productsMockSofa, productsMockDress]);
    });
});
