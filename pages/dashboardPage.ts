import {Page , Locator} from '@playwright/test';
import { strict } from 'assert';


export class DashboardPage {
    readonly page: Page;
    readonly dashboardTittle: Locator;

    constructor (page: Page) {
        this.page = page;
        this.dashboardTittle = page.getByTestId('titulo-dashboard');

    }

    async visitarPaginaLogin() {
        await this.page.goto('http://localhost:3000/login');
    }

  
    



 
}
  
