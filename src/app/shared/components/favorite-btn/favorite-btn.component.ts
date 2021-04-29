import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Favorite } from '../../models/favorite.model';

@Component({
  selector: 'app-favorite-btn',
  templateUrl: './favorite-btn.component.html',
  styleUrls: ['./favorite-btn.component.scss'],
})
export class FavoriteBtnComponent implements OnInit {
  private _favorites: Favorite[];

  @Input()
  get favorites(): Favorite[] {
    return this._favorites;
  }

  set favorites(favorites: Favorite[]) {
    this.isLoading = false;
    this._favorites = favorites;
  }

  @Input()
  productId: string;
  @Output()
  toggleFavorite = new EventEmitter<boolean>();

  public isLoading: boolean;

  constructor() {}

  ngOnInit(): void {}

  get isFavorite(): boolean {
    return !!this.favorites.find(
      (favorite) => favorite.productId === this.productId
    );
  }

  buttonClicked(): void {
    this.isLoading = true;
    return this.toggleFavorite.emit(!this.isFavorite);
  }
}
