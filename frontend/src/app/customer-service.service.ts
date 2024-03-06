import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

let endpoint='https://contaminados.meseguercr.com/api/games';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': '*/*'

  })
};

@Injectable({
  providedIn: 'root'
})

export class CustomerServiceService {

  roomId:string='';
  roundId:string='';
  username:string='';
  password?:string='';


  Game = {
    name:'',
    owner: '',
    password: ''
  }

  constructor(private http: HttpClient) {}

  getHeader(username:string, password?:string){
    
    if(password){
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'player': username,
          'password': password,
          'X-msg': ''
          
        })
      };
    }
    
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'player': username
    
      })
    };
  }

  connectServer(API_endpoint:string){
    if(API_endpoint != ''){
      endpoint = '';
      endpoint = API_endpoint;
    }
  }

  gameSearch(name?:string, room_status?:string, records?:number, returned?:number):Observable<any>{

    let url = endpoint+'?';
    

    if(name){
      url+=  ('name='+name +'&')
    }

    if(room_status){
      url+=  ('status='+room_status +'&')
    }

    if(records){
      url+=  ('page='+records +'&')
    }

    if(returned){
      url+=  ('limit='+returned)
    }
    return this.http.get(url, httpOptions).pipe(
      catchError(this.manageError)
    )
  }

  gameCreate(game: Object): Observable<any>{
    const url = `${endpoint}`

    return this.http.post<any>(url, game,httpOptions).pipe(
      catchError(this.manageError)
    )
  }

  getGame():Observable<any>{
    const url = `${endpoint}/${this.roomId}`
    
    const httpOptions = this.getHeader(this.username, this.password);

    return this.http.get(url, httpOptions).pipe(
      catchError(this.manageError)
    )
  }

  joinGame(user:string):Observable<any>{
    const url = `${endpoint}/${this.roomId}`
    
    const httpOptions = this.getHeader(this.username, this.password);

    const body = {
      "player": user
    }
    
    return this.http.put(
      url,
      body,
      httpOptions).pipe(
        catchError(this.manageError)
      )
    
  }

  gameStart():Observable<any>{
    const url = `${endpoint}/${this.roomId}/start`

    const httpOptions = this.getHeader(this.username, this.password);

    return this.http.head(url, httpOptions).pipe(
      catchError(this.manageError));
  }

  getRounds():Observable<any>{
    const url = `${endpoint}/${this.roomId}/rounds`

    const httpOptions = this.getHeader(this.username, this.password);

    return this.http.get(url, httpOptions).pipe(
      catchError(this.manageError));
  }

  showRound():Observable<any>{
    const url = `${endpoint}/${this.roomId}/rounds/${this.roundId}`
    
    const httpOptions = this.getHeader(this.username, this.password);

    return this.http.get(url, httpOptions).pipe(
      catchError(this.manageError)
    )
  }

  proposeGroup(usuarios:string[]):Observable<any>{
    const url = `${endpoint}/${this.roomId}/rounds/${this.roundId}`
    
    const httpOptions = this.getHeader(this.username, this.password);


    const body = {
      "group": usuarios
    }
    
    return this.http.patch(
      url,
      body,
      httpOptions).pipe(
        catchError(this.manageError)
      )
  }

  voteGroup(vote:boolean):Observable<any>{
    const url = `${endpoint}/${this.roomId}/rounds/${this.roundId}`
    
    const httpOptions = this.getHeader(this.username, this.password);


    const body = {
      "vote": vote
    }
    
    return this.http.post(
      url,
      body,
      httpOptions).pipe(
        catchError(this.manageError)
      )
  }

  actionGroup(action:boolean):Observable<any>{
    const url = `${endpoint}/${this.roomId}/rounds/${this.roundId}`
    
    const httpOptions = this.getHeader(this.username, this.password);

    const body = {
      "action": action
    }
    
    return this.http.put(
      url,
      body,
      httpOptions).pipe(
        catchError(this.manageError)
      )
  }

  private manageError(error: HttpErrorResponse) {
    
    
    if (error.error instanceof ErrorEvent) {
      // Un error del lado del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // El servidor retornó un código de error
      console.error(`Código de error ${error.status}, ` + `cuerpo: ${error.error}`);      
    }
    // Devolver un observable con un mensaje de error
    return throwError(error.error);
    }
}
