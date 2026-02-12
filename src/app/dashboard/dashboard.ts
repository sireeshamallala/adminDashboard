import { Component, signal } from '@angular/core';
import { TopNavbar } from './top-navbar/top-navbar';
import { Sidebar } from './sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Sidebar, TopNavbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  sidebarCollapsed = signal(false);

  toggleSidebar(){
    this.sidebarCollapsed.update(v => !v);
  }

}
