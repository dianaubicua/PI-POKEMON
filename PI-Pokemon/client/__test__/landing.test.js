import { render, screen } from '@testing-library/react';
import Landing from '../src/pages/landing';
import { MemoryRouter } from 'react-router-dom';

test('Renderiza texto de bienvenida', () => {
    render(<Landing />, { wrapper: MemoryRouter})

    expect(screen.getByText('My PokeWiki')).toBeInTheDocument()
})