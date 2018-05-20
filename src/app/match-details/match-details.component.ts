import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';
import {ApiService} from '../api.service';
import { Game } from '../Interfaces/game';
import { Hero } from '../Interfaces/hero';
import { Player } from '../Interfaces/player';
import { Match } from '../Interfaces/match';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  displayedColumns = ['player', 'hero', 'kills', 'deaths', 'assists', 'gpm', 'xpm'];
  dataSourceRadiant;
  dataSourceDire;
  match = tmpMatch;
  heroes: Hero[];
  matchId: number;
  loading = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => {
      this.matchId = params['match_id'];
      this.getHeroes();
    });
  }

  getHeroes(): void {
    this.apiService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.getMatch();
    });
  }

  getMatch(): void {
    this.apiService.getMatch(this.matchId).subscribe(match =>  {
      match.players.forEach(player => {
        player.hero = this.heroes.find(hero => hero.id === player.hero_id);
      });
      this.match = match;
      this.dataSourceRadiant = new MatTableDataSource(match.players.filter(player => player.player_slot < 5));
      this.dataSourceDire = new MatTableDataSource(match.players.filter(player => player.player_slot >= 5));
      this.loading = false;
    });
  }
}

const tmpMatch = {players: [{
  radiant_win: true,
}]};
