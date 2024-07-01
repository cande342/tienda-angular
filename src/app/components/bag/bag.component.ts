import { Component, OnInit } from '@angular/core';
import { ItemsServicesService } from '../../services/items-services.service';
import { Item } from '../../services/items-services.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css',
  
})
export class BagComponent implements OnInit {
  
  mostrarBoton: boolean = true; 
  itemsEnBolsa: Item[] = [];

  
  constructor(
    private itemsService: ItemsServicesService,

  ) { }

  ngOnInit() {
    this.itemsService.itemsEnBolsa$.subscribe(items => {
      this.itemsEnBolsa = items;
    });
  }

  calcularTotal(): number {
    return this.itemsEnBolsa.reduce((total, item) => total + item.precio, 0);
  }
  
  
quitarItem(item: Item) {
  this.itemsService.eliminarItem(item);
}
vaciarBolsa() {
  this.itemsEnBolsa = []; 
  this.itemsService.vaciarBolsa(); 
}
}
