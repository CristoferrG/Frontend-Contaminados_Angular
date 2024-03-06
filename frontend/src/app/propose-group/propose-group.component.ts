import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-propose-group',
  templateUrl: './propose-group.component.html',
  styleUrls: ['./propose-group.component.css']
})
export class ProposeGroupComponent {
  @Input() group:string[]=[]
  @Output() newGroup = new EventEmitter<string[]>();

  constructor(private apiService:CustomerServiceService,
    private _snackBar: MatSnackBar){}

  proposeGroup(){
    this.apiService.proposeGroup(this.group).subscribe(
      (data:any) => {
        this._snackBar.open('Proposal submitted', 'Cerrar', {
          duration: 5000
        });
      },
      (error) => {
        this._snackBar.open(error.msg, 'Cerrar', {
          duration: 5000
        });
      }
    );
    this.changeValueGroup();
  }

  changeValueGroup() {
    this.newGroup.emit([]);
  }
}
