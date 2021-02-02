import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {

  movies: Movies[] = [];

  constructor(private moviesService: MoviesService) {
    console.log(moviesService.getMovies);
   }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.moviesService.getMovies().subscribe(data => {
      this.movies = data;
    });

  }

}
