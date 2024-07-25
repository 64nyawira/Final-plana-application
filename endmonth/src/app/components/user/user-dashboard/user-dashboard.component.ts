import { Component,OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CarouselComponent } from "../carousel/carousel.component";
import { RecommendedEventsComponent } from "../recommended-events/recommended-events.component";
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.css',
    imports: [SidebarComponent,NavbarComponent, CarouselComponent, RecommendedEventsComponent, FooterComponent]
})
export class UserDashboardComponent {
 
}
