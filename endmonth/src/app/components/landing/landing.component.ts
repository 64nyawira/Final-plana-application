import { Component } from '@angular/core';
import { CarouselComponent } from "../user/carousel/carousel.component";
import { FooterComponent } from "../footer/footer.component";
import { RecommendedEventsComponent } from "../user/recommended-events/recommended-events.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ FooterComponent, RecommendedEventsComponent,CarouselComponent,RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
