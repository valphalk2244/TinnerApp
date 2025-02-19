import { Component, inject, WritableSignal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MatSelectModule } from '@angular/material/select'
import { MemberCardComponent } from '../member/member-card/member-card.component'
import { LikeService } from '../_services/like.service'
import { Paginator, UserQueryPagination, default_pageSizeOption, default_paginator } from '../_models/pagination'
import { User } from '../_models/user'

@Component({
  selector: 'app-followers',
  imports: [MemberCardComponent, MatIcon, MatSelectModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss'
})
export class FollowersComponent {
  private likeService = inject(LikeService)
  followers: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pageSizeOption

  constructor() {
    this.followers = this.likeService.followers
  }

  async onSearch() {
    this.likeService.getfollowers()
  }

  ngOnInit(): void {
    this.onSearch()
  }

  onReset() {
    this.followers.set(default_paginator)
    this.onSearch()
  }

  onPageChnage(event: PageEvent) {
    const copypaginator = this.followers()
    copypaginator.pagination.currentPage = event.pageIndex + 1
    copypaginator.pagination.pageSize = event.pageSize
    this.followers.set(copypaginator)
    this.onSearch()

  }
}
