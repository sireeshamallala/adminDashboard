import { Component, computed, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UrlsList } from '../../services/urlsList';
import { User, UserApiResponse, UserQueryParams } from '../../model/user.model';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe } from '@angular/common';

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
   private datePipe = inject(DatePipe);


  totalPages = signal(0);
  currentPage = signal(1);
  totalRecords = signal(0);
  search = signal('');
  limit = signal(10);
  sort = signal('createdAt');
  loading = signal(false);

  query = computed<UserQueryParams>(() => ({
    page: this.currentPage(),
    limit: this.limit(),
    search: this.search(),
    sort: this.sort()
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




  // getusersData() {
  //   this.ApiService.getdatalist(this.UrlsList.getUserList, this.query).subscribe({
  //     next: (res) => {
  //       if (res) {
  //         this.users.set(res.data);
  //         this.totalPages.set(res.totalPages);
  //         this.totalRecords.set(res.totalRecords);
  //       }
  //     }
  //   })
  // }
  toggleSort(field: string) {
    const currentSort = this.sort();
    const newSort = currentSort === field ? '-' + field : field;
    this.sort.set(newSort);
  }

}
