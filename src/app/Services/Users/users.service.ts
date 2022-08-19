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
  getUsersByID(usname: string): Observable<IUsers> {
    return this.us.getOne('Users', usname);
  }
  //Add Users
  addUsers(Users: IUsers): Observable<IUsers> {
    return this.us.Post('Users', Users);
  }
  //Update Users
  updateUsers(usname: string, User: IUsers): Observable<IUsers> {
    return this.us.put('Users', usname, User);
  }
  //Delete Users by username
  deleteUsers(usname: string): Observable<IUsers> {
    return this.us.Delete('Users', usname);
  }

  //   //Update Users
  //  userupdate(username:string,User:IUsers):Observable<IUsers>{
  //     return this.us.putuser("Users",username,User);
  //   }

<<<<<<< HEAD
    // usertype(type:number):Observable<IUsers[]>{

    //  return this.us.getuerbytype("Users",type)
    // }
  
=======
  //   usertype(type:number):Observable<IUsers[]>{

  //    return this.us.getuerbytype("Users",type)
  //   }
>>>>>>> 06fafa74c9476b4174e60853a37deda696b99dc5
}
