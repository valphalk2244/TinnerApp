import { Router } from '@angular/router'
import { routes } from './../app.routes'
import { Component, inject } from '@angular/core'

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
  private router = inject(Router)
  error: undefined | { [id: string]: string | number }
  constructor() {
    this.error = this.router.getCurrentNavigation()?.extras.state
  }
}
