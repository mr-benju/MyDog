export function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

// validarCorreo('benjamin@gmail.com') // true
// validarCorreo('benjamin@gmail')     // false
// validarCorreo('benjamin@.com')      // false
// validarCorreo('benjamin@gmail .com')// false

// se verifican que existan condiciones que establece el regex para que un correo sea valido