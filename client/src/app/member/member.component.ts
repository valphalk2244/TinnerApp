import { Component, inject } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-member',
  imports: [],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {
  private _http = inject(HttpClient)

  constructor() {
    const url = environment.baseUrl + 'api/user/all'
    this._http.get<fake_user[]>(url).subscribe({
      next: resp => { console.log(resp) },
    })
  }
}

type fake_user = {
  "id": string,
  "name": string
}