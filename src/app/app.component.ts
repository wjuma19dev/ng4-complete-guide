import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title: String = 'ng4-complete-guide';
  loadFeature: String = 'recipe';

  onNavigate( feature: String ) {
    this.loadFeature = feature;
  }
}
