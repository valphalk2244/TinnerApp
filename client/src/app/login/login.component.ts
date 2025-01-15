import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { use } from 'chai'
import { PasswordMatchValidator } from '../_validators/password.match.validator'
import { PasswordValidator } from '../_validators/password.validator'
import { CommonModule } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDatepickerModule, MatRadioModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login'
  form: FormGroup

  private readonly _currentYear = new Date().getFullYear()
  readonly minDate = new Date(this._currentYear - 70, 0, 1)
  readonly maxDate = new Date(this._currentYear - 18, 11, 31)
  readonly startDate = new Date(this._currentYear - 18, 0, 1)

  errorMessages = {
    username: signal(''),
    password: signal(''),
    display_name: signal(''),
    confirm_password: signal(''),
  }

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      password: new FormControl(null, [Validators.required, PasswordValidator(8, 16)]),
    })
  }

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login'
    this.updateForm()
  }
  updateForm() {
    if (this.mode === 'register') {
      this.form.addControl('confirm_password', new FormControl(null, Validators.required))
      this.form.addValidators(PasswordMatchValidator('password', 'confirm_password'))

      this.form.addControl('display_name', new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]))
      this.form.addControl('date_of_birth', new FormControl(null, Validators.required))
      this.form.addControl('gender', new FormControl(null, Validators.required))
      this.form.addControl('looking_for', new FormControl(null, Validators.required))
    } else {
      this.form.removeControl('confirm_password')
      this.form.removeValidators(PasswordMatchValidator('password', 'confirm_password'))
      this.form.removeControl('display_name')
      this.form.removeControl('date_of_birth')
      this.form.removeControl('gender')
      this.form.removeControl('looking_for')
    }

  }
  onSubmit() {

  }

  updateErrorMessages(ctrlName: string) {
    const control = this.form.get(ctrlName)
    if (!control) return

    switch (ctrlName) {
      case 'username':
        if (control.hasError('required'))
          this.errorMessages.username.set('username is required')
        else if (control.hasError('minlength'))
          this.errorMessages.username.set('username must be at least 6 characters')
        else if (control.hasError('maxlength'))
          this.errorMessages.username.set('username must be at most 16 characters')
        else
          this.errorMessages.username.set('')
        // console.log(this.errorMessages.username())
        break

      case 'password':
        if (control.hasError('required'))
          this.errorMessages.password.set('required')
        else if (control.hasError('invalidMinLength'))
          this.errorMessages.password.set('password must be at least 8 characters')
        else if (control.hasError('invalidMaxLength'))
          this.errorMessages.password.set('password must be at most 16 characters')
        else if (control.hasError('invalidLowerCase'))
          this.errorMessages.password.set('password must contain at least one lowercase letter')
        else if (control.hasError('invalidUpperCase'))
          this.errorMessages.password.set('password must contain at least one uppercase letter')
        else if (control.hasError('invalidNumberic'))
          this.errorMessages.password.set('password must contain at least one number')
        else if (control.hasError('invalidSpecialChar'))
          this.errorMessages.password.set('password must contain at least one special character')
        else
          this.errorMessages.password.set('')
        break

      case 'confirm_password':
        if (control.hasError('required'))
          this.errorMessages.confirm_password.set('required')
        else if (control.hasError('misMatch'))
          this.errorMessages.confirm_password.set('passwords do not match')
        else
          this.errorMessages.confirm_password.set('')
        break

      case 'display_name':
        if (control.hasError('required'))
          this.errorMessages.display_name.set('required')
        else if (control.hasError('minlength'))
          this.errorMessages.display_name.set('display name must be at least 3 characters')
        else if (control.hasError('maxlength'))
          this.errorMessages.display_name.set('display name must be at most 16 characters')
        else
          this.errorMessages.display_name.set('')
        break

    }
  }
}
