import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

export interface SidebarMenu {
  label: string;
  icon: string;
  route?: string;
  children?: SidebarMenu[];
  expanded?: boolean;
}


@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() collapsed = false;
  private router = inject(Router)

  sidebarMenu : SidebarMenu[] = [
    {
      label: 'dashboard',
      icon: 'bi bi-speedometer2',
      route: '/dashboard'
    },
    {
      label: 'Users',
      icon: 'bi bi-people',
      expanded: false,
      children: [
        {
        label: 'User List',
        icon: 'bi bi-dot',
        route: '/users'
        }
      ]
    },
    // {
    //   label: 'dashboard',
    //   icon: 'bi bi-speedometer2',
    //   route: '/settings'
    // },
  ];

   onMenuClick(menu: any): void {
       // Sidebar collapsed → do nothing
    if (this.collapsed) return;

    if (menu.children?.length) {
      this.sidebarMenu.forEach(m => {
        if (m !== menu) m.expanded = false;
      });
      menu.expanded = !menu.expanded;
      return;
    }

     // Menu without children → navigate
    if (menu.route) {
      this.router.navigate([menu.route]);
    }
   }
}
