import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, getDoc, orderBy, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { Wine } from '../models/wine';
import { WineListComponent } from '../wine-list/wine-list.component';
import { AppUser } from '../models/app-user';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, WineListComponent, MatProgressBarModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatListModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private firestore: Firestore = inject(Firestore);
  private analytics: Analytics = inject(Analytics);
  private auth: Auth = inject(Auth);
  user: AppUser | null = null;
  userOrgs: any;
  isLoading = true;
  wines: any[] = [];

  constructor(
    private router: Router,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (!user) {
        console.error('User is not logged in');
        return;
      }
      this.user = (await getDoc(doc(this.firestore, 'users', user.uid))).data() as AppUser;
      this.userOrgs = (await getDoc(doc(this.firestore, 'orgs', this.user.org))).data();
    });

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