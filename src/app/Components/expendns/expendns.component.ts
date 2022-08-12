import { Component, OnInit } from '@angular/core';
import { IExpenses } from 'src/app/Interface/IExpenses';
import { FormGroup,ReactiveFormsModule,FormBuilder,FormControl, Validators } from '@angular/forms';
import { ExpendsService } from 'src/app/Services/Expends/expends.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-expendns',
  templateUrl: './expendns.component.html',
  styleUrls: ['./expendns.component.css']
})
export class ExpendnsComponent implements OnInit {
  id:number;
  Expand:IExpenses[]=[];
  userexpendne:FormGroup;
  constructor(private fb:FormBuilder, private epser:ExpendsService ) { 
    this.userexpendne=fb.group({
      name:['',Validators.required]
 
     });
   
  }

  ngOnInit(): void {

   this.getdatatotable();

  }
  //getdatatotable 
  getdatatotable()
  {
    this.epser.getExpends().subscribe(Data=>
      {
       
        this.Expand=Data; 
        console.log(this.Expand);
        
      });
  }

  addexpend()
  {
    this.epser.addExpends(this.userexpendne.value).subscribe((res:IExpenses)=>
      {
        this.Expand.push(res);
     
      })

  }


  deletexpend()

{

   console.log(this.id);
     this.epser.deleteExpends(this.id)
     .subscribe(Date=>
       {
     //   this.transDELNUL=Date;
     this.getdatatotable();
      });

}


}
