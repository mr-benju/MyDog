import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';
import Galeria from '../components/Galeria';

describe('Componente Galeria', () => {
  it('renderiza el nombre del perro correctamente', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const perros = [{ nombre: 'San Bernardo'}];

    act(() => {
      const root = createRoot(container);
      root.render(
        <MemoryRouter>
          <Galeria perros={perros} />
        </MemoryRouter>
      );
    });

    expect(container.textContent).toContain('San Bernardo');
  });
});
