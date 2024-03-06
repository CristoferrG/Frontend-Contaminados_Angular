import { Component  } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vote-round-member',
  templateUrl: './vote-round-member.component.html',
  styleUrls: ['./vote-round-member.component.css']
})
export class VoteRoundMemberComponent {

  constructor(private apiService:CustomerServiceService,
              private _snackBar: MatSnackBar){}
  
  vote(value:boolean){
    this.apiService.voteGroup(value).subscribe(
      (data:any) => {
        this._snackBar.open('Vote added', 'Cerrar', {
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
