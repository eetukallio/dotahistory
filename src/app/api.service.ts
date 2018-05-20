import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './Interfaces/game';
import { Hero } from './Interfaces/hero';
import { Player } from './Interfaces/player';
import { Match } from './Interfaces/match';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  recentMatchesUrl = 'https://api.opendota.com/api/players/';
  heroImageUrl = 'http://cdn.dota2.com/apps/dota2/images/heroes/';
  heroUrl = 'https://api.opendota.com/api/heroes';
  playerUrl = 'https://api.opendota.com/api/players/';
  searchUrl = 'https://api.opendota.com/api/search?q=';
  matchUrl = 'https://api.opendota.com/api/matches/';

  constructor(private httpClient: HttpClient) { }

  getRecentMathces(id): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.recentMatchesUrl + id + '/recentMatches');
  }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroUrl);
  }

  getPlayer(id): Observable<Player> {
    return this.httpClient.get<Player>(this.playerUrl + id);
  }

  getMatch(id): Observable<Match> {
    return this.httpClient.get<Match>(this.matchUrl + id);
  }

  searchPlayers(name): Observable<Player[]> {
    return this.httpClient.get<Player[]>(this.searchUrl + name);
  }
}
