import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/user'
import { cacheManager } from '../_helper/cache'

type dataCategory = 'members' | 'follower' | 'following'
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);
  private url = environment.baseUrl + 'api/'
  paginator = signal<Paginator<UserQueryPagination, User>>(default_paginator)

  private getData(category: dataCategory) {
    const pagination = this.paginator().pagination

    let key = cacheManager.createKey(pagination)
    const cacheData = cacheManager.load(key, category)
    if (cacheData) {
      console.log(`load ${category} from cache`)
      this.paginator.set(cacheData)
      return
    }

    console.log(`load ${category} from server`)

    // Create proper HTTP params
    let params = new HttpParams()
    if (pagination.pageSize) params = params.append('pageSize', pagination.pageSize.toString())
    if (pagination.currentPage) params = params.append('currentPage', pagination.currentPage.toString())
    if ('username' in pagination && pagination.username) params = params.append('username', pagination.username)
    if ('looking_for' in pagination && pagination.looking_for) params = params.append('looking_for', pagination.looking_for)
    if ('min_age' in pagination && pagination.min_age) params = params.append('min_age', pagination.min_age.toString())
    if ('max_age' in pagination && pagination.max_age) params = params.append('max_age', pagination.max_age.toString())

    this.http.get<Paginator<UserQueryPagination, User>>(`${this.url}user`, { params }).subscribe({
      next: (response) => {
        key = cacheManager.createKey(pagination)
        cacheManager.save(key, category, response)
        this.paginator.set(response)
      },
      error: (error) => {
        console.error('Error fetching data:', error)
      }
    })
  }

  getMember() {
    this.getData('members')
  }
}