import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-action-round-member',
  templateUrl: './action-round-member.component.html',
  styleUrls: ['./action-round-member.component.css']
})
export class ActionRoundMemberComponent {
  @Input() psychopath?: boolean;
  constructor(private apiService:CustomerServiceService,
              private _snackBar: MatSnackBar){}
  
  //Realiza la contribucion o sabotage
  doAction(value:boolean){
    this.apiService.actionGroup(value).subscribe(
      (data:any) => {
        this._snackBar.open('Action registered', 'Cerrar', {
          duration:5000
        });
      },
      (error) => {
        this._snackBar.open(error.msg, 'Cerrar', {
          duration: 5000
        });
      }
    );;
  
  }
}
