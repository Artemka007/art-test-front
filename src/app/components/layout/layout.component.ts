import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
})
export class LayoutComponent {
  // todo: вынести header в отдельный компонент
}
