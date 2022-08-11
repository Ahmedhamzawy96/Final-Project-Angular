import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICar} from 'src/app/Models/ICar';
import { GenericService } from '../GenericService/generic.service';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private Serv:GenericService) { }
//Get Car
 getCar():Observable<ICar[]> {
  return this.Serv.getAll("Car");
}
// Get Car By ID 
getCarByID(id:number):Observable<ICar> {
  return this.Serv.getOne("Car",id);
}
//Add Car
addCar(recipt:ICar): Observable<ICar>{
  return this.Serv.Post("Car",recipt);
}
//Update car
updateCar(id:number,recipt:ICar):Observable<ICar>{
  return this.Serv.put("Car",id,recipt);
}
//Delete car
deleteCar(id:number):Observable<ICar> {
  return this.Serv.Delete("Car",id);
}


}
