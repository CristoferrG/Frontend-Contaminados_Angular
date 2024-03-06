import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-join-game-search',
  templateUrl: './join-game-search.component.html',
  styleUrls: ['./join-game-search.component.css']
})
export class JoinGameSearchComponent {
  constructor(
    public dialogRef: MatDialogRef<JoinGameSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  @ViewChild('username', { static: false }) user: ElementRef;
  @ViewChild('password', { static: false }) password: ElementRef;
  @ViewChild('formJoin', { static: false }) form: ElementRef;


  //Le retorna los datos ingresados al componente que lo invocó
  SaveData(): void { 
    const data = {
      username: this.user.nativeElement.value,
      password: this.password.nativeElement.value
    };
    this.dialogRef.close(data);
  }
}
