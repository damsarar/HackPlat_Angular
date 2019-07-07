import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Event {
  id: string;
  name: string;
  organizer: string;
  venue: string;
  dateAt: string;
  createdAt; string;
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    var url = "http://damsara.tk/hackplat/eventList.php";
    this.http.get<Event[]>(url).subscribe(data =>{
      this.events = data;
      console.log(data);
    });
  }

}
