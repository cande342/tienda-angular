import { Component } from '@angular/core';
import { ItemsComponent } from './items/items.component';
import { PreviewComponent } from './preview/preview.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ItemsComponent, PreviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
