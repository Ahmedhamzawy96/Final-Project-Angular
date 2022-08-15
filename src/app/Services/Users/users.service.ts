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
  getUsersByUserName(name: string): Observable<IUsers> {
    return this.us.getOne('Users', name);
  }
  //Add Users
  addUsers(Users: IUsers): Observable<IUsers> {
    return this.us.Post('Users', Users);
  }
  //Update Users
  updateUsers(name: string, User: IUsers): Observable<IUsers> {
    return this.us.put('Users', name, User);
  }
  //Delete Users by username
  deleteUsers(usname: string): Observable<IUsers> {
    return this.us.Delete('Users', usname);
  }
}
