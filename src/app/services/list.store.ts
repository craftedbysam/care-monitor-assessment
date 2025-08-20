import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { take } from "rxjs";

export interface ListItem {
  id: number;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ListStore {
  items = signal<ListItem[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}
  fetchItems() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<ListItem[]>('/api/items', {
      withCredentials: true
    }).pipe(take(1)).subscribe({
      next: (items) => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: (error) => {
        const errorMessage = error.error?.message || error.message || 'Unexpected error occurred';
        this.error.set(errorMessage);
        this.loading.set(false);
      }
    });
  }

}