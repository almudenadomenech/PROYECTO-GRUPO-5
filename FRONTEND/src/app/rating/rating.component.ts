import { Component } from '@angular/core';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-rating-config',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
  providers: [NgbRatingConfig],
})
export class NgbdRatingConfig {
	constructor(config: NgbRatingConfig) {
		
		config.max = 5;
		config.readonly = true;
	}
}