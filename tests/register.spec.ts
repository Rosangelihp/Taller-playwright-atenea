import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import datosRegister from '../data/datosRegister.json';

let registerPage:  RegisterPage;
let emailDinamico: string;

test.beforeAll(() => {
  const timestamp = Date.now();
  emailDinamico = `user${timestamp}@mail.com`;
});

test.beforeEach(async ({ page })=>{
  registerPage = new RegisterPage (page);
  await registerPage.visitarPaginaRegistro();
});

test('TC-1 Verificación de elementos visuales en la pagina de registro', async ({ page }) => {
  await expect(registerPage.firstNameInput).toBeVisible();
  await expect(registerPage.lastNameInput).toBeVisible();
  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.registerButton).toBeVisible();

});

test('TC-2 Verificar Botón de registro esta inhabilitado por defecto', async ({page}) =>{
  await expect(registerPage.registerButton).toBeDisabled();

});

test('TC-3 Verificar Botón de registro este habilitado al completar los campos obligatorios', async ({page}) =>{
 const usuario = datosRegister.usuarioValido;
 await registerPage.completarFormularioRegistro (usuario.nombre, usuario.apellido, emailDinamico, usuario.password);
 await expect(registerPage.registerButton).toBeEnabled();

});

test('TC-4 Verificar redirección a la página de inicio al hacer click en el botón de "inicio de sesión"', async ({page})=>{
  await registerPage.loginButton.click();
  await expect(page).toHaveURL('http://localhost:3000/login');
 
  });
   
test('TC-5 Verificar registro exitoso con datos válidos', async ({page})=>{
  const usuario = datosRegister.usuarioValido;
  await registerPage.completarHacerClickBotonRegistro(usuario.nombre, usuario.apellido, emailDinamico, usuario.password);
  await expect(page.getByText('Registro exitoso')).toBeVisible();


 });

 test('TC-6 Verificar que un usuario no pueda registrarse con un email ya registrado', async ({page})=>{
   const usuario = datosRegister.usuarioValido;
   await registerPage.completarHacerClickBotonRegistro(usuario.nombre, usuario.apellido, emailDinamico, usuario.password);
   await expect(page.getByText('Registro exitoso')).toBeVisible();
   await registerPage.visitarPaginaRegistro();
   await registerPage.completarHacerClickBotonRegistro(usuario.nombre, usuario.apellido, emailDinamico, usuario.password);
   await expect(page.getByText('email already in use')).toBeVisible();
   await expect(page.getByText('Registro exitoso')).not.toBeVisible();

 });
 