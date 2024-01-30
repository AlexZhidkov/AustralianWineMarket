import { Component, Input } from '@angular/core';
import { Wine } from '../models/wine';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule],
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.scss'
})
export class WineListComponent {
  @Input({ required: true }) wines!: Wine[];

}
