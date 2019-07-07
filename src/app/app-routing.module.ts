import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';
import { VenueListComponent } from './venue-list/venue-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'event_list', component: EventListComponent},
  {path: 'venue_list', component: VenueListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
