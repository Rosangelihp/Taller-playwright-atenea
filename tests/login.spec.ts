import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import datosRegister from '../data/datosRegister.json';
import { DashboardPage } from '../pages/dashboardPage';


let loginPage:  LoginPage;
let dashboardPage : DashboardPage
const usuario = datosRegister.usuarioValido;

test.beforeEach(async ({ page })=>{
  loginPage = new LoginPage (page);
  dashboardPage = new DashboardPage (page);
  await loginPage.visitarPaginaLogin();
});

test('TC-7 Verificar inicio de sesion exitosamente', async ({ page }) => {
  await loginPage.completarFormulariologin(usuario.email, usuario.password);
  await loginPage.hacerClickBotonlogin();
  await expect(page.getByText('inicio de sesión exitoso')).toBeVisible();
  await expect(dashboardPage.dashboardTittle).toBeVisible();
});



 