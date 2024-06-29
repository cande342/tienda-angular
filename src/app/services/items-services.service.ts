import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Item {
  nombre: string;
  precio: number;
  descripcion: string;
  aporte: string;
}

export interface Categoria {
  categoria: string;
  items: Item[];
}


@Injectable({
  providedIn: 'root'
})

export class ItemsServicesService {

  constructor(private http: HttpClient) { }

  obtenerItemsPorCategoria(categoria: string): Observable<Item[]> {
    return this.http.get<Categoria[]>('../assets/arsenal.json')
      .pipe(
        map(categorias => {
          const categoriaEncontrada = categorias.find(c => c.categoria === categoria);
          return categoriaEncontrada ? categoriaEncontrada.items : [];
        })
      );
  }

}
