import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BagComponent } from './components/store/bag/bag.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'tienda', component: DashboardComponent },
    { path: 'bag', component: BagComponent }
];
