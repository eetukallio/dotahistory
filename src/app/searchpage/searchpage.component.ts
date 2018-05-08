import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Player } from '../Interfaces/player';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  players: Player[] = [];

  displayList = false;

  searchValue = '';

  loading = false;

  loaded = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  search() {
    this.loading = true;
    this.loaded = false;
    this.apiService.searchPlayers(this.searchValue).subscribe(players => {
      this.players = players;
      this.displayList = true;
      console.log(players);
      this.loading = false;
      this.loaded = true;
    });
  }

}
