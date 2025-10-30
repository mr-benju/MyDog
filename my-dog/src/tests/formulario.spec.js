import { validarCorreo } from "../utils/validarCorreo.js";

describe("Validación de correo electrónico", function () {
  it("Debe aceptar un correo válido", function () {
    const resultado = validarCorreo("usuario@correo.com");
    expect(resultado).toBe(true);
    // Se establecen distintos escenarios con correos de prueba
  });

  it("Debe rechazar un correo sin @", function () {
    const resultado = validarCorreo("usuariocorreo.com");
    expect(resultado).toBe(false);
  });

  it("Debe rechazar un correo sin dominio", function () {
    const resultado = validarCorreo("usuario@correo");
    expect(resultado).toBe(false);
  });
});

// se valida de que sea verdadero o falso dependiendo del formato del correo ingresado