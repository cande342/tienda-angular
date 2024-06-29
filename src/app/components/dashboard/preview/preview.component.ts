import { Component } from '@angular/core';
import { ItemsServicesService } from '../../../services/items-services.service'; 
import { Item } from '../../../services/items-services.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {

  itemSeleccionado: Item | null = null;

  constructor(private itemsService: ItemsServicesService) {}

  ngOnInit() {
    this.itemsService.itemSeleccionado$.subscribe(itemName => {
      if (itemName) {
        this.obtenerItemPorNombre(itemName);
      }
    });

  }
  
  obtenerItemPorNombre(itemName: string) {
      this.itemsService.obtenerItemPorNombre(itemName)
        .subscribe(item => {
          this.itemSeleccionado = item;
        });
  }

  agregarABolsa(item: Item) {
    this.itemsService.agregarItem(item);
  }
}
