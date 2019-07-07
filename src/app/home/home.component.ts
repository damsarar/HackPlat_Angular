import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {map, startWith} from 'rxjs/operators';

export interface Event {
  id: string;
  name: string;
  venue: string;
  dateAt: string;
  createdAt; string;
}

export interface Venue {
  name: string;

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myControl1 = new FormControl();
  myControl2 = new FormControl();

  options1: Event[] = [];
  
  options2: Venue[] = [
    {name: 'University of Colombo'},
    {name: 'University of Kelaniya'},
    {name: 'University of Moratuwa'}
  ];

  filteredOptions1: Observable<Event[]>;
  filteredOptions2: Observable<Venue[]>;

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit() {

    var url1 = "http://damsara.tk/hackplat/eventList.php";
    this.http.get<Event[]>(url1).subscribe(data =>{
      this.options1 = data;
    });

    this.filteredOptions1 = this.myControl1.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter1(name) : this.options1.slice())
      );

    this.filteredOptions2 = this.myControl2.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter2(name) : this.options2.slice())
    );
  }

  displayFn1(event?: Event): string | undefined {
    return event ? event.name : undefined;
  }

  displayFn2(venue?: Venue): string | undefined {
    return venue ? venue.name : undefined;
  }

  private _filter1(name: string): Event[] {
    const filterValue = name.toLowerCase();

    return this.options1.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filter2(name: string): Venue[] {
    const filterValue = name.toLowerCase();

    return this.options2.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
