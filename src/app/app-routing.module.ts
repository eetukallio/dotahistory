import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { MatchDetailsComponent } from './match-details/match-details.component';


const routes: Routes = [
  {path: '', component: SearchpageComponent},
  {path: 'player/:account_id', component: HomepageComponent },
  {path: 'match/:match_id', component: MatchDetailsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
