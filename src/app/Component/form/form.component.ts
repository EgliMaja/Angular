import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, delay, distinctUntilChanged, map, Observable,of,startWith,Subject, switchMap, takeUntil, tap} from 'rxjs';
import { FindTicketService, flyreservation } from 'src/app/service/find-ticket.service';

function MatchValidator(checkPlace: string): ValidatorFn {
  return (control): ValidationErrors| null => {
    if (control && control.value) {
      const form = control.parent;
      if (control.value !== form?.get(checkPlace)?.value) {
        return { notMatch: false };
      }

      return null;
    }

    return { notMatch: false };
  };
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public flybook:flyreservation={} as flyreservation;
  private reservation:BehaviorSubject<flyreservation[]>
  reservation$:Observable<flyreservation[]>
  searchFlyghts:FormGroup;

  public FromAirport: string[] = [
    'International Airport Tirana','Turin Italy', 'Heathrow London','Amsterdam Netherlands','Milano Italy' ,'Roma Italy',
    'Buenos Aires Argentina', 'Instanbul Turkey' , 'New York USA Newark NJ', 'Madrid Spain','Paris France' , 'Brusseless Belgium',
    'Hanover Germany', 'Berlin Germany', 'Ankara Instanbul','Barcelona Spain','Munich Germany', 'Frankfurt Germany','Treviso Italy',
    'Naples Italy','Orleans France' , 'Marsielle France','Pisa Italy'
  ]

  private ToAirport: string[]=[
    'International Airport Tirana','Turin Italy', 'Heathrow London','Amsterdam Netherlands','Milano Italy' ,'Roma Italy',
    'Buenos Aires Argentina', 'Instanbul Turkey' , 'New York USA Newark NJ', 'Madrid Spain','Paris France' , 'Brusseless Belgium',
    'Hanover Germany', 'Berlin Germany', 'Ankara Instanbul','Barcelona Spain','Munich Germany', 'Frankfurt Germany','Treviso Italy',
    'Naples Italy','Orleans France' , 'Marsielle France','Pisa Italy'
  ]
  @Input()
  FromDate:Date=new Date();
  DepartDate:Date=new Date();


  private untilDestroy = new Subject();
  public FindAirportTo = new FormControl('')
  public FindAirportFrom = new FormControl('')

  constructor(private service:FindTicketService, private router:Router) {
    this.reservation= new BehaviorSubject<flyreservation[]>([]);
    this.reservation$=this.reservation.asObservable();
    this.searchFlyghts= new FormGroup({
      flyTo: new FormControl('' , [Validators.required]),
      depart: new FormControl('',MatchValidator('flyTo')),
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl('',MatchValidator('startDate')),
    })


   }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    this.untilDestroy.complete();
    this.untilDestroy.next(null);
  }
  FilteredCountriesFrom: Observable<string[]>=this.FindAirportFrom.valueChanges
  .pipe(
    takeUntil(this.untilDestroy.asObservable()),
    debounceTime(200),
    tap(console.log),
    startWith(),
    distinctUntilChanged(),
    switchMap(Filtered => {
      return of(this.ToAirport).pipe(
        delay(200),
        map(Countries =>{
          return Countries.filter(Places => Places.toUpperCase()
          .includes(Filtered.toUpperCase()))
        }),
        )
      }),
  )

  FilteredCountriesTo: Observable<string[]>=this.FindAirportTo.valueChanges
  .pipe(
    takeUntil(this.untilDestroy.asObservable()),
    debounceTime(200),
    tap(console.log),
    startWith(),
    switchMap(Filtered => {
      return of(this.ToAirport).pipe(
        delay(200),
        map(Countries =>{
          return Countries.filter(Places => Places.toUpperCase()
          .includes(Filtered.toUpperCase()))
        }),
        )
      }),
  )



  ShowPlaces: Observable<string[]> = of(this.FromAirport).pipe(delay(200))
  ShowPlacess: Observable<string[]> = of(this.ToAirport).pipe(delay(200))

  search(){
    this.router.navigate(['userview'])
  }
}
