import {Page , Locator} from '@playwright/test';
import { strict } from 'assert';


export class LoginPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly dashboardTittle: Locator;

    constructor (page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByTestId('boton-login');
        this.dashboardTittle = page.getByTestId('titulo-dashboard');

    }

    async visitarPaginaLogin() {
        await this.page.goto('http://localhost:3000/login');
    }

    async completarFormulariologin(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

    }

    async hacerClickBotonlogin() {
        await this.loginButton.click();
    }


 
}
  
