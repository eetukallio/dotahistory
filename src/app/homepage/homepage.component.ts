import { Component, OnInit } from '@angular/core';
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

  displayedColumns = ['match_id', 'hero_id', 'duration', 'radiant_win'];
  dataSource = new MatTableDataSource(GAMES);
  recentMatches: Game[];
  heroes: Hero[];
  playerId = 31918716;
  player: Player = {
    profile: {
      account_id: 0,
      avatarfull: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
      name: 'No Player',
      personaname: 'No Player'
    }
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getRecentMatches();
    this.getPlayer();
  }

  getHeroes(): void {
    this.apiService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  getRecentMatches(): void {
    this.apiService.getRecentMathces(this.playerId).subscribe(games =>  {
      this.dataSource = new MatTableDataSource(games);

    });
  }
  getPlayer(): void {
    this.apiService.getPlayer(this.playerId).subscribe(player => {
      this.player = player;
    });
  }

}

const GAMES: Game[] = [
  {match_id: 1, hero_id: 1, duration: 0, radiant_win: false, game_mode: 1, lobby_type: 1, start_time: 0, kills: 1, assists: 0, deaths: 0},
];