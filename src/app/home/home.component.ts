import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, orderBy, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { Wine } from '../models/wine';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatListModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private firestore: Firestore = inject(Firestore);
  private analytics: Analytics = inject(Analytics);
  private auth: Auth = inject(Auth);
  isLoading = true;
  wines: any[] = [];

  constructor(
    private router: Router,
  ) {
    collectionData(query(collection(this.firestore, 'wines'),
      orderBy('title', 'asc')), { idField: 'id' })
      .pipe().subscribe((wines) => {
        this.wines = wines as Wine[];
        this.isLoading = false;
      });

  }

  addWine() {
    const newWineId = doc(collection(this.firestore, 'wines')).id;
    this.router.navigate(['wine', newWineId]);
  }

}