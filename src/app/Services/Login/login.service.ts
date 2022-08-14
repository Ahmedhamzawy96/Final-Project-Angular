import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/Interface/login-user';
import { GenericService } from '../GenericService/generic.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private Client: GenericService) {}

  Login(user: LoginUser): Observable<any> {
    return this.Client.Post('Login', user);
  }
}
