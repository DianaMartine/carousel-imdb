import { ImdbService } from './../../services/imdb.service';
import { Component, Input, OnInit } from '@angular/core';

import { CarouselAnimation, fadeIn, fadeOut } from './carousel.animations';
import { transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('void => fade', [
        useAnimation(fadeIn, { params: { time: '1s' } }),
      ]),
      transition('fade => void', [
        useAnimation(fadeOut, { params: { time: '1s' } }),
      ]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {
  @Input() animationType = CarouselAnimation.Fade;

  public movies: any = [];
  currentMovie = 0;

  constructor(private imdb: ImdbService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.imdb.getData().subscribe((data) => {
      data.forEach((item) => {
        this.movies.push(item);
        while (this.movies.length > 10) {
          this.movies.pop();
        }
        return;
      });
      /*       this.movies.forEach((movie: any) => {
        this.imdb.getPosters(movie.id).subscribe((data) => {
          console.log(data);
          movie.image = data.posters[0].link;
          this.imdb.putPosters(movie.id, movie);
          return;
        });
      });

      console.log(this.movies); */
    });
  }

  onPreviousClick() {
    const previous = this.currentMovie - 1;
    this.currentMovie = previous < 0 ? this.movies.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentMovie + 1;
    this.currentMovie = next === this.movies.length ? 0 : next;
  }
}
