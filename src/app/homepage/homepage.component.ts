import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';
import {ApiService} from '../api.service';
import { Game } from '../Interfaces/game';
import { Hero } from '../Interfaces/hero';
import { Player } from '../Interfaces/player';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  displayedColumns = ['match_id', 'hero_id', 'player_slot', 'duration', 'radiant_win'];
  dataSource = new MatTableDataSource(GAMES);
  recentMatches: Game[];
  heroes: Hero[];
  playerId = 0;
  player: Player = {
    profile: {
      account_id: 0,
      avatarfull: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
      name: 'No Player',
      personaname: 'No Player'
    }
  };
  loading = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => {
      this.playerId = params['account_id'];
      this.getPlayer();
    });
  }

  getHeroes(): void {
    this.apiService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.getRecentMatches();
    });
  }

  getRecentMatches(): void {
    this.apiService.getRecentMathces(this.playerId).subscribe(games =>  {
      games.forEach(game => {
        game.hero = this.heroes.find(hero => hero.id === game.hero_id);
      });
      this.dataSource = new MatTableDataSource(games);
      this.loading = false;
    });
  }
  getPlayer(): void {

    this.apiService.getPlayer(this.playerId).subscribe(player => {
      this.player = player;
      this.getHeroes();
    });
  }

}

const GAMES: Game[] = [
  {match_id: 1,
    hero_id: 1,
    duration: 0,
    radiant_win: false,
    game_mode: 1,
    lobby_type: 1,
    start_time: 0,
    kills: 1,
    assists: 0,
    deaths: 0,
    player_slot: 1,
    hero: {name: 'N/A', localized_name: 'N/A', id: 0}},
];
