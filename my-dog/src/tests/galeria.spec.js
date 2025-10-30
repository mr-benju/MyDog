import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Galeria from '../components/Galeria';

afterEach(() => cleanup());

describe('Componente Galeria', () => {
  it('Renderiza el nombre del perro correctamente', () => {
    render(
      <MemoryRouter>
        <Galeria perros={[{ nombre: 'San Bernardo' }]} />
      </MemoryRouter>
    );

    expect(screen.getByText('San Bernardo')).toBeTruthy();
  });

  it('Renderiza todas las imágenes de los perros correctamente', () => {
    const perros = [
      { nombre: 'San Bernardo', imagen: '/img/san_bernardo.png' },
      { nombre: 'Labrador', imagen: '/img/labrador.png' }
    ];

    render(
      <MemoryRouter>
        <Galeria perros={perros} />
      </MemoryRouter>
    );

    const imagenes = screen.getAllByRole('img');
    expect(imagenes.length).toBe(perros.length);

    imagenes.forEach((img, index) => {
      expect(img.src).toContain(perros[index].imagen);
      expect(img.alt).toBe(perros[index].nombre);
      expect(img.width).toBe(200);
      expect(img.height).toBe(200);
    });
  });
});

