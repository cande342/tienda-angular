import { Component } from '@angular/core';
import { ItemsServicesService } from '../../../services/items-services.service'; 
import { Item } from '../../../services/items-services.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  bolsaLlena$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  itemSeleccionado: Item | null = null;
  itemsEnBolsaSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  constructor(private itemsService: ItemsServicesService) {
    this.bolsaLlena$.next(this.itemsService.estaBolsaLlena()); 
  }

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
    if (this.itemSeleccionado) { 
      this.itemSeleccionado.agregado = true; 
    }
    this.bolsaLlena$.next(this.itemsService.estaBolsaLlena());
 }

}
