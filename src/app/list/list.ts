import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ListStore } from '../services/list.store';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit {
  constructor(
    public store: ListStore,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.fetchItems();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
