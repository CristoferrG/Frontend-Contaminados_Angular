import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { CustomerServiceService } from '../customer-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { JoinGameSearchComponent } from '../join-game-search/join-game-search.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomepageComponent implements OnInit {

  // Variables para controlar la visibilidad de los formularios
  showCreateForm = false;
  showSearchForm = false;
  showJoinForm = false;

  infoGame: any = {}; //almacena la informacion del juego
  infoRound: any = {}; //almacena la informacion de la ronda del juego
  infoRounds: any = {}; //almacena la informacion de todas las rondas

  //Variables para mostrar los datos de la busqueda de partidas
  resultSearch?: any
  dataSource = new MatTableDataSource<any>(this.resultSearch);
  displayedColumns: string[] = ['name', 'owner', 'status', 'password', 'Join'];

  resultGame?: string; //Variable que muestra el ganador de la partida
  stateRound?: string //Almacena el estado de la ronda del juego
  roomId: string //valor ya se consigue de manera estatica
  roundId?: string //el valor del roundId se asigna con el currentRound del getGame
  group: string[] = []; //almacena los nombres del grupo que se va a proponer

  username: string = ''
  password?: string

  voteButton: boolean = false; //Se usa para visibilizar el boton a la hora de votar
  contributionButton: boolean = false; //Se usa para visibilizar el boton a la hora de reazliar la contribucion/sabotage
  proposeButton: boolean = false; //Se usa para visibilizar el boton a la hora de proponer grupos

  psychopath?: boolean //Se utiliza para cambiar el color del icono del usuario si es psicopata y para mostrar el boton de sabotear al psicopata

  showServers: boolean = true; //Se utiliza para mostrar el combo box de los servers

  //Instancias necesarias para poder manipular la informacion ingresada en los text fields de los formularios que se muestran en la GUI, para el metodo createGame()
  @Input() game = { name: '', owner: '', password: '' };

  @ViewChild('form1', { static: false }) form1: ElementRef;
  @ViewChild('name', { static: false }) name: ElementRef;
  @ViewChild('owner', { static: false }) owner: ElementRef;
  @ViewChild('psw', { static: false }) psw: ElementRef;
  @ViewChild('roundView', { static: false }) roundView: ElementRef;

  //Instancias necesarias para poder manipular la informacion ingresada en los text fields de los formularios que se muestran en la GUI, para el metodo gameSearch()
  @ViewChild('form2', { static: false }) form2: ElementRef;
  @ViewChild('nameSearch', { static: false }) ns: ElementRef;
  @ViewChild('status', { static: false }) stat: MatSelect;
  @ViewChild('records', { static: false }) rec: ElementRef;
  @ViewChild('returned', { static: false }) ret: ElementRef;

  //Instancias para el join
  @ViewChild('user', { static: false }) user: ElementRef;
  @ViewChild('joinRoomId', { static: false }) joinRoomId: ElementRef;

  //Instancia del combo box de servers
  @ViewChild('server', { static: false }) server: MatSelect;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(
    private apiService: CustomerServiceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { //Ejecuta un método cuando se recarga la página
    // const executeAfterReload = localStorage.getItem('executeAfterReload');
    // if (executeAfterReload === 'true') {
    //   this.getGame(); //Cuando inicia el juego, que traiga los datos para no presionar el botón "obtener datos"

    //   // Limpia el indicador para que no se ejecute de nuevo en futuras recargas.
    //   localStorage.removeItem('executeAfterReload');
    // }

    // this.getRounds(); //En casos de refresco de la pagina, que se siga mostrando la info de las rondas

  }

  //funcionalidad que cambia los servers
  serverSwitch(){
    switch(this.server.value) { 
      case '1': { 
         this.apiService.connectServer('https://contaminados.meseguercr.com/api/games');
         break; 
      } 
      case 'a': { 
         this.apiService.connectServer('https://backend.e-2023.meseguercr.com/api/games'); 
         break; 
      } 
      default: { 
         alert('Not found')
         break; 
      } 
   }
  }

  //Meodo utilizado para buscar partidas
  gameSearch(): void {
    this.apiService.gameSearch(
      this.ns.nativeElement.value,
      this.stat.value,
      this.rec.nativeElement.value,
      this.ret.nativeElement.value).subscribe(
        (data: any) => {
          if (data.data.length <= 0) { //Si no encuentra salas
            this.showPopUp('There is no game with these characteristics')
            this.resultSearch = null
            return
          } else {
            //Si encuentra salas
            this.resultSearch = data.data;
            this.dataSource = new MatTableDataSource<any>(this.resultSearch);
            this.dataSource.paginator = this.paginator;
            this.showPopUp('Game successfully found')
          }
        },
        (error) => {
          this.showPopUp(error.msg)
        }
      );
  }

  //Metodo utilizado para crear una sala
  gameCreate(): void {

    if (this.game.password == '') {  //Se crea la sala sin password

      var newGame = {name: "", owner: ""};
      newGame.name = this.game.name;
      newGame.owner = this.game.owner;

      this.apiService.gameCreate(newGame).subscribe(
        (response: any) => {
          this.showCreateForm = false;
          this.showServers = false;
          this.showPopUp("Game successfully created");
          this.roomId = response.data.id;
          this.username = response.data.owner;
          this.password = this.game.password;
          this.getGame();
        }, (err) => {
          this.showPopUp(err.msg);
        }
      );
    }

    else if (this.game.password.length > 2) { //Se crea la sala con password

      var newGame2 = {name: "", owner: "", password: ""};
      newGame2.name = this.game.name;
      newGame2.owner = this.game.owner;
      newGame2.password = this.game.password;

      this.apiService.gameCreate(newGame2).subscribe(
        (response: any) => {
          this.showCreateForm = false;
          this.showServers = false;
          this.showPopUp('Game successfully created')

          this.roomId = response.data.id;
          this.username = response.data.owner;
          this.password = this.game.password;
          this.getGame();

        }, (err) => {
          if (err.msg) {

            this.showPopUp(err.msg);

          } else {

            this.showPopUp('The game could not be created');

          }

        }
      );
    } else {
      this.showPopUp('The password must be longer than 2 characters');
    }
  }

  //Metodo que actualiza la informacion de la partida
  getGame(): void {
    this.apiService.roomId = this.roomId;
    this.apiService.username = this.username;
    this.apiService.password = this.password;

    this.apiService.getGame().subscribe(
      (data: any) => {
        this.infoGame = data;
        this.psychopath = this.infoGame.data.enemies.includes(this.username);

        if (this.infoGame.data.status == 'rounds') {
          this.apiService.roundId = data.data.currentRound;
          this.showRound();
          this.getRounds(); //persistencia de los datos de las rondas a la hora de clickear el boton
        }

        else if (this.infoGame.data.status == 'ended') {
          this.getRounds(); //Actualiza la variable infoRounds
          this.resultGame = this.winner();

        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Metodo que inicia la partida, solo el owner puede llamar al metodo
  gameStart(): void {
    this.apiService.roomId = this.roomId;
    this.apiService.username = this.username;
    this.apiService.password = this.password;

    this.apiService.gameStart().subscribe(
      () => {
        localStorage.setItem('executeAfterReload', 'true');

        this.showPopUp('Game successfully started')

        this.getGame();
      },
      (error) => {

        this.showPopUp('Game needs a minimun of 5 players to start')

      }
    );
  }

  //Metodo que muestra la informacion de las rondas
  getRounds(): void {

    this.apiService.getRounds().subscribe(
      (data: any) => {
        this.infoRounds = data;

        //Ordena las rondas por orden de creacion
        this.infoRounds.data.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Metodo para unirse a una partida ingresando el id de la sala
  joinGame(): void {
    let userJoin = this.user.nativeElement.value;

    this.apiService.username = userJoin
    this.apiService.roomId = this.joinRoomId.nativeElement.value;
    this.apiService.password = this.psw.nativeElement.value;

    this.apiService.joinGame(userJoin).subscribe(
      (data: any) => {
        this.showJoinForm = false;
        this.showServers = false;
        this.username = userJoin
        this.password = this.psw.nativeElement.value;
        this.roomId = this.joinRoomId.nativeElement.value;
        this.infoGame = data
        this.showPopUp('Successfully joined the game')
      },
      (error) => {

        if (error.msg) {
          this.showPopUp(error.msg);

        }
        else {
          this.showPopUp('Error entering the game');

        }
      }
    );
  }

  //Metodo que muestra los datos de la ronda actual
  showRound(): void {
    this.apiService.showRound().subscribe(
      (data: any) => {
        this.infoRound = data;
        this.stateRound = this.infoRound.data.status;

        this.voteButton = false;
        this.proposeButton = false;
        this.contributionButton = false;

        if (this.stateRound == 'waiting-on-group') {
          this.contributionButton = data.data.group.includes(this.username);
        } else if (this.stateRound == 'voting') {
          this.voteButton = true;
        } else if (this.stateRound == 'waiting-on-leader') {
          this.proposeButton = this.username === data.data.leader;
        } else {
          this.infoRound = {};
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Metodo utilizado para unirse a una partida buscada
  joinedSearchedGame(RoomIdJoin: string) {

    //Muestra una ventana emergente
    const dialogRef = this.dialog.open(JoinGameSearchComponent, {
      width: '300px',
      height: '230px'
    });

    //Cuando la ventana emergente se cierra correctamente, se capturan los datos que ingreso el usuario
    dialogRef.afterClosed().subscribe(result => {
      if (result) { //Si el usuario ingreso datos

        if (result.username == '') {
          this.showPopUp('You must enter a username');
          return
        }

        else if (result.password != '') {
          this.apiService.password = result.password;
        }

        this.apiService.username = result.username;
        this.apiService.roomId = RoomIdJoin;

        this.apiService.joinGame(result.username).subscribe( //Se intenta unir a la partida desde la api 
          (data: any) => {

            this.showSearchForm = false; //Oculta el formulario de busqueda
            this.showServers = false; //Oculta el combo box de los servers
            this.username = result.username
            this.password = result.password
            this.roomId = RoomIdJoin;

            this.infoGame = data

            this.resultSearch = null; //Oculta la tabla de los resultados de la sala

            this.showPopUp('Successfully joined the game')
          },
          (error) => {

            if (error.msg) {
              this.showPopUp(error.msg);

            }
            else {
              this.showPopUp('Error entering the game');

            }
          }
        );

      }
    }

    )
  }

  changeGroupValue(group: string[]) {
    this.group = group;
  }

  //Determina el ganador para mostrarlo en la interfaz
  winner() {

    this.voteButton = false;
    this.proposeButton = false;
    this.contributionButton = false;
    this.getRounds()
    let citizens: number = 0
    let enemies: number = 0
    this.infoRounds.data.forEach((round: any) => {
      round.result === 'citizens' ? citizens++ : enemies++
    });

    return citizens > enemies ? 'Citizens won!' : 'Enemies won!'

  }

  //Muestra un pop-up
  showPopUp(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 5000
    });
  }

  //Metodo que sirve para seleccionar los usuarios al momento de proponer un grupo
  userSelected(username: string) {
    const index = this.group.indexOf(username);

    if (index === -1) {
      this.group.push(username);
    } else {
      this.group.splice(index, 1);
    }
  }

  //Metodo necesario para mostrar el formulario al darle click al boton crear
  onClickCreate() {
    this.showCreateForm = true;
    this.showSearchForm = false;
    this.showJoinForm = false;
    this.resultSearch = null;
  }

  //Metodo necesario para mostrar el formulario al darle click al boton buscar
  onClickSearch() {
    this.showSearchForm = true;
    this.showCreateForm = false;
    this.showJoinForm = false;

  }

  //Metodo necesario para mostrar el formulario al darle click al boton buscar
  onClickJoin() {
    this.showJoinForm = true;
    this.showSearchForm = false;
    this.showCreateForm = false;
    this.resultSearch = null;
  }
}
