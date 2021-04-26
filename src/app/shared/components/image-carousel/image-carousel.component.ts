import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None, 
})
export class ImageCarouselComponent implements OnInit {
  @Input()
  images: { name: string; src: string }[];

  mappedImages: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.mappedImages = this.images.map((image) => image);
  }
}
