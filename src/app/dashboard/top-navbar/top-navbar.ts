import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-top-navbar',
  imports: [],
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.scss',
})
export class TopNavbar {

  private router = inject(Router);
  private searchService = inject(SearchService);
  
  @Output() toggle = new EventEmitter<void>();

   onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.search.set(value);
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(["/login"])
  }
}

