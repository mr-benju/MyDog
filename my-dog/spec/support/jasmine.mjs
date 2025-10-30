export default {
  spec_dir: "src/tests", // En que ruta verificara los tests
  spec_files: [
    "**/*[sS]pec.?(m)js"
  ],
  helpers: [
    "helpers/**/*.?(m)js"
  ],
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
    forbidDuplicateNames: true
  }
}
