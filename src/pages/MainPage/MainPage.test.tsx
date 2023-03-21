import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainPage } from './MainPage';
jest.mock('../../utils/getPrice');
jest.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00'));

afterEach(jest.clearAllMocks);
describe('MainPage test', () => {
    it('test render page without currentTime', () => {
        const rendered = render(<MainPage/>);
        
        expect(rendered.asFragment()).toMatchSnapshot();
    });

    describe.each([
        'Для дома',
        'Одежда',
        'Электроника'
    ])('test categories', (category) => {
        it('should render in page', () => {
            const rendered = render(<MainPage/>);
            const renderedCategory = rendered.getAllByText(category).filter(item => item.classList.contains('categories__badge'))[0];
            
            expect(renderedCategory).toBeInTheDocument();
        });

        it('should filter by categories', () => {
            const rendered = render(<MainPage/>);
            const renderedCategory = rendered.getAllByText(category).filter(item => item.classList.contains('categories__badge'))[0];
            fireEvent.click(renderedCategory);

            expect(rendered).toMatchSnapshot();
            expect(renderedCategory).toHaveClass('categories__badge_selected');
        });
    });

    it('sort button should render in page', () => {
        const rendered = render(<MainPage/>);
        const sortButton = rendered.baseElement.querySelector('.sort-button');
        
        expect(sortButton).not.toBe(null);
        expect(sortButton).toHaveTextContent(
            'Сортировать по умолчанию'
        );
    });

    it('test sorting', () => {
        const rendered = render(<MainPage/>);
        const sortButton = rendered.getAllByRole('button').filter(item => item.classList.contains('sort-button'))[0];
        
        fireEvent.click(sortButton);
        expect(rendered).toMatchSnapshot();
    });
});
