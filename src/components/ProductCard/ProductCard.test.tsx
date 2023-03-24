import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';
jest.mock('../../utils/getPrice', () => ({
    __esModule: true,
    getPrice: jest.fn(() => '1 000 ₽')
}));

const defaultProduct: Product = {
    id: 2, 
    name: 'Костюм гуся',
    description: 'Запускаем гуся, работяги',
    price: 1000,
    priceSymbol: '₽',
    category: 'Одежда',
};

afterEach(jest.clearAllMocks);
describe('ProductCard test', () => {
    it('карточка рендерится без картинки', () => {
        const rendered = render(<ProductCard {...defaultProduct} />);
        
        expect(rendered.queryByTestId('product-card__image')).toBeNull();
        expect(rendered.asFragment()).toMatchSnapshot();
    });

    it('карточка рендерится с картинкой', () => {
        const rendered = render(<ProductCard {...defaultProduct} imgUrl = '/lamp.png' />);
        
        const productImg = rendered.getByTestId('product-card__image');
        expect(productImg).toBeInTheDocument();
        expect(productImg.getAttribute('src')).toEqual('/lamp.png');
        expect(rendered.asFragment()).toMatchSnapshot();
    });

    it('тексты рендарятся в нужных местах', () => {
        const rendered = render(<ProductCard {...defaultProduct} />);

        expect(rendered.getByText('Костюм гуся')).toHaveClass(
            'product-card__name'
        );
        expect(rendered.getByText('Запускаем гуся, работяги')).toHaveClass(
            'product-card__description'
        );
        expect(rendered.getByText('1 000 ₽')).toHaveClass(
            'product-card__price'
        );
        expect(rendered.getByText('Одежда')).toHaveClass(
            'product-card__category'
        );
    });

});
