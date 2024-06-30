import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ItemsServicesService } from '../../../services/items-services.service'; 
import { Item } from '../../../services/items-services.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [TabMenuModule, CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  itemsMenu: MenuItem[] | undefined;
  items: Item[] = [];
  activeItem: string | null = null;

  constructor(private itemsService: ItemsServicesService) { } 

  ngOnInit() {
      this.itemsMenu = [
          { label: 'Tirador' },
          { label: 'Mago' },
          { label: 'Luchador' },
          { label: 'Asesino' },
          { label: 'Soporte' },
          { label: 'Tanque' },
      ];   
      this.activeItem = 'Tirador'; 
      if (this.activeItem) { 
        this.obtenerItems(this.activeItem);
      }
    }
    
    cambiarCategoria(nuevaCategoria: string) {
      this.activeItem = nuevaCategoria;
      this.obtenerItems(nuevaCategoria);
    }

    obtenerItems(categoria: string) {
      this.itemsService.obtenerItemsPorCategoria(categoria)
        .subscribe(items => {
          this.items = items; 
        });
    }

    seleccionarItem(itemName: string) {
      this.itemsService.seleccionarItem(itemName);
    }
    
  }


