import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, MatButtonModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {

  @Input() slideshowImages: slideshowImagesI[] = [{"name": "beaver.png", imageUrl: "../../assets/images/beaver.png"}, {"name": "random.png", imageUrl: "../../assets/images/badger.png"}];
  chosenImage: slideshowImagesI = this.slideshowImages[0] || {"name": "default.png", imageUrl: "../../default.png"};
  chosenImageIndex = 0;

  slideshowNext() {
    this.chosenImageIndex++;
    this.chosenImage = this.slideshowImages[this.chosenImageIndex];
    console.log("chosen image", this.chosenImage)
  }

  slideshowPrevious() {
    this.chosenImageIndex--;
    this.chosenImage = this.slideshowImages[this.chosenImageIndex];
  }
}

export interface slideshowImagesI {
  name: string;
  imageUrl: string;
}
