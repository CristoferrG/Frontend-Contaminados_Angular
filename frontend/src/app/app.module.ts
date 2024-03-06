import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomepageComponent } from './homepage/homepage.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ActionRoundMemberComponent } from './action-round-member/action-round-member.component';
import { VoteRoundMemberComponent } from './vote-round-member/vote-round-member.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MemberComponent } from './member/member.component';
import { ProposeGroupComponent } from './propose-group/propose-group.component';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { JoinGameSearchComponent } from './join-game-search/join-game-search.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ActionRoundMemberComponent,
    VoteRoundMemberComponent,
    MemberComponent,
    ProposeGroupComponent,
    JoinGameSearchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule ,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
