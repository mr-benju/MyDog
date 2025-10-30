import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// ¡¡IMPORTANTE!!
// La ruta ahora sube un nivel (..) para entrar a components/
import { Filtro } from '../components/Filtro.jsx'; 

describe('Pruebas para el componente Filtro', () => {

  // ¡Prueba 1 (sin comentar)!
  it('debería renderizarse (mostrarse) correctamente', () => {
    
    render(<Filtro />); 
    
    // !!! CAMBIA 'Buscar raza...' por el placeholder real de tu input !!!
    const inputDelFiltro = screen.getByPlaceholderText('Buscar raza...'); 
    
    expect(inputDelFiltro).toBeInTheDocument();
  });

  // ¡Prueba 2 (sin comentar)!
  it('debería actualizar el valor cuando el usuario escribe', () => {
    
    render(<Filtro />);
    
    const inputDelFiltro = screen.getByPlaceholderText('Buscar raza...');
    
    // Simula al usuario escribiendo "boxer"
    fireEvent.change(inputDelFiltro, { target: { value: 'boxer' } });
    
    // Comprueba que el valor del input ha cambiado
    expect(inputDelFiltro.value).toBe('boxer');
  });

});