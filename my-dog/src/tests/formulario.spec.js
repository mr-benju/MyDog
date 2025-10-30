import { validarCorreo } from "../utils/validarCorreo.js";

describe("Validación de correo electrónico", function () {
  it("Debe aceptar un correo válido", function () {
    const resultado = validarCorreo("usuario@correo.com");
    expect(resultado).toBeTrue();
  });

  it("Debe rechazar un correo sin @", function () {
    const resultado = validarCorreo("usuariocorreo.com");
    expect(resultado).toBeFalse();
  });

  it("Debe rechazar un correo sin dominio", function () {
    const resultado = validarCorreo("usuario@correo");
    expect(resultado).toBeFalse();
  });
});
