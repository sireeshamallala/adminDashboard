import { Component, computed, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UrlsList } from '../../services/urlsList';
import { User, UserApiResponse, UserQueryParams } from '../../model/user.model';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe } from '@angular/common';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {

  private ApiService = inject(ApiService);
  private UrlsList = inject(UrlsList);
  private searchService = inject(SearchService);



  totalPages = signal(0);
  currentPage = signal(1);
  totalRecords = signal(0);
  // search = signal('');
  limit = signal(10);
  sort = signal('createdAt');
  order = signal<'asc' | 'desc'>('desc');
  loading = signal(false);

  query = computed<UserQueryParams>(() => ({
    page: this.currentPage(),
    limit: this.limit(),
    search: this.searchService.search(),
    sortBy: this.sort(),
    order: this.order()
  }));

  usersResource = rxResource<UserApiResponse, UserQueryParams>({
    params: () => this.query(),

    stream: ({ params }) =>
      this.ApiService.getdatalist(
        this.UrlsList.getUserList,
        params
      )
  });

  users = computed(() =>
    this.usersResource.value()?.data ?? []
  );

  paginations = computed(() => 
   this.usersResource.value()?.pagination
  );

  allPagination = computed(() => ({
  totalPages: this.paginations()?.totalPages ?? 0,
  totalRecords: this.paginations()?.totalRecords ?? 0,
  currentPage: this.paginations()?.currentPage ?? 1,
}));


 pages = computed(() => {
  const total = this.allPagination()?.totalPages;
  return Array.from({ length: total }, (_, i) => i + 1);
});

  toggleSort(column: string) {
  this.currentPage.set(1);
  if (this.sort() === column) {
    this.order.set(this.order() === 'asc' ? 'desc' : 'asc');
  } else {
    this.sort.set(column);
    this.order.set('asc');
  }
}

goToPage(page: number) {
  this.currentPage.set(page);
}

nextPage() {
  if (this.currentPage() < this.totalPages()) {
    this.currentPage.update(p => p + 1);
  }
}
prevPage() {
  if (this.currentPage() > 1) {
    this.currentPage.update(p => p - 1);
  }
}


}
