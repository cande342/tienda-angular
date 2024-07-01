import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';

export interface Item {
  nombre: string;
  precio: number;
  descripcion: string;
  aporte: string;
  imagen: string;
  agregado: boolean;
}

export interface Categoria {
  categoria: string;
  items: Item[];
}


@Injectable({
  providedIn: 'root'
})

export class ItemsServicesService {

  //Items
  private itemSeleccionadoSubject = new BehaviorSubject<string | null>(null);
  itemSeleccionado$ = this.itemSeleccionadoSubject.asObservable();

  // Bolsa
  private itemsEnBolsa: Item[] = [];
  private itemsEnBolsaSubject = new BehaviorSubject<Item[]>(this.itemsEnBolsa);
  itemsEnBolsa$ = this.itemsEnBolsaSubject.asObservable();

  constructor(private http: HttpClient) { }

  obtenerItemsPorCategoria(categoria: string): Observable<Item[]> {
    return this.http.get<Categoria[]>('data/arsenal.json')
      .pipe(
        map(categorias => {
          const categoriaEncontrada = categorias.find(c => c.categoria === categoria);
          return categoriaEncontrada ? categoriaEncontrada.items : [];
        })
      );
  }

  seleccionarItem(itemName: string) {
    this.itemSeleccionadoSubject.next(itemName);
  }
  
  obtenerItemPorNombre(nombre: string): Observable<Item | null> {
    return this.http.get<Categoria[]>('data/arsenal.json')
      .pipe(
        map(categorias => {
          const itemEncontrado = categorias.flatMap(c => c.items).find(item => item.nombre === nombre);
          if (itemEncontrado) {
            return { ...itemEncontrado, agregado: false }; 
          } else {
            return null;
          }
        })
      );
  }

  //Métodos para el componente BOLSA

  agregarItem(item: Item) {
    if (this.itemsEnBolsa.length < 6) {
      this.itemsEnBolsa.push(item);
      this.itemsEnBolsaSubject.next(this.itemsEnBolsa);
      item.agregado=true;
    } else {
      console.error('La bolsa está llena (máximo 6 items).');
    }
  }

  estaBolsaLlena(): boolean {
    return this.itemsEnBolsa.length >= 6; 
  }

  eliminarItem(item: Item) {
    const index = this.itemsEnBolsa.indexOf(item);
    if (index > -1) {
      this.itemsEnBolsa.splice(index, 1);
      this.itemsEnBolsaSubject.next(this.itemsEnBolsa);
    }
  }
  
  vaciarBolsa() {
    this.itemsEnBolsa = []; 
    this.itemsEnBolsaSubject.next(this.itemsEnBolsa); 
  }
  
}
