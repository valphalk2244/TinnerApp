import { pagination } from './../../../../server/src/types/pagination.type'
import { message } from './../../../../server/src/types/message.type'
import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { Paginator, QueryPagination, UserQueryPagination, default_paginator } from '../_models/pagination'
import { User } from '../_models/user'
import { Message } from '../_models/message'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { delay, firstValueFrom, retry, Subject, timer } from 'rxjs'
import { cacheManager } from '../_helper/cache'
import { pareQuery } from '../_helper/helper'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  [x: string]: any
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl + 'api/message';
  private wsUrl = environment.wsUrl
  paginator = signal<Paginator<QueryPagination, Message>>(default_paginator)
  isWSConnected = signal<boolean>(false)
  private socket$!: WebSocketSubject<any>
  private messageSubject = new Subject<Message>()
  message$ = this.messageSubject.asObservable()

  constructor() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    this.wsUrl = environment.production ? `${protocol}//${window.location.host}${environment.wsUrl}` : environment.wsUrl
  }

  connect(recipient_id: string, token: string, user_id: string): void {
    const RECONNECT_INTERVAL = 5000
    this.socket$ = webSocket(`${this.wsUrl}?token=${token}&recipient_id=${recipient_id}`)
    this.socket$.pipe(
      retry({
        delay: err => {
          console.error('connection lose')
          this.isWSConnected.set(false)
          console.log('ws : reconnecting in 5s')
          return timer(RECONNECT_INTERVAL)
        }
      })
    ).subscribe({
      next: msg => {
        this.isWSConnected.set(true)
        const message = msg as Message
        if (message.sender && message.recipient) {
          this.messageSubject.next(message)
        }
      },
      error: err => {
        this.isWSConnected.set(false)
        console.log('ws : error,somthing went wrong', err)
        console.error(err)
      },
      complete: () => {
        this.isWSConnected.set(false)
        console.log('ws : disconnected')
      }
    })
  }

  sendMessage(message: Message): void {
    this.socket$.next(message)
  }

  close() {
    this.socket$.complete()
  }

  async getMessagesHistory(recipient_id: string) {
    const pagination = this.paginator().pagination
    const key = cacheManager.createKey(pagination)

    const paginationCache = cacheManager.load(key, 'chat')
    if (paginationCache) {
      this.paginator.set(paginationCache)
      console.log('load chat from cache')
      return
    }

    console.log('load chat from server')
    const url = this.baseUrl + `/${recipient_id}` + pareQuery(pagination)
    try {
      const paginator = await firstValueFrom(this.http.get<Paginator<QueryPagination, Message>>(url))
      cacheManager.save(key, paginator, 'chat')
      this.paginator.set(paginator)
    } catch (error) {
      console.error(`error loading chat from server`)
      console.error(error)
    }
  }

}
