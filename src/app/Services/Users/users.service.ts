import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsers } from 'src/app/Interface/IUsers';
import { GenericService } from '../GenericService/generic.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private us: GenericService) {}

  //Get Users
  getUsers(): Observable<IUsers[]> {
    return this.us.getAll('Users');
  }
  //Get Users By ID
  getUsersByUserName(userName: string): Observable<IUsers> {
    return this.us.getOne('Users', userName);
  }
  //Add Users
  addUsers(Users: IUsers): Observable<IUsers> {
    return this.us.Post('Users', Users);
  }
  //Update Users
  updateUsers(userName: string, User: IUsers): Observable<IUsers> {
    return this.us.put('Users', userName, User);
  }
  //Delete Users
  deleteUsers(userName: string): Observable<IUsers> {
    return this.us.Delete('Users', userName);
  }
}
