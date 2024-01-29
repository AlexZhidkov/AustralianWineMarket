import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatListModule, MatSnackBarModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private firestore: Firestore = inject(Firestore);
  private analytics: Analytics = inject(Analytics);
  private auth: Auth = inject(Auth);
  isLoading = false;
  wines: any[] = [];

  constructor(
    private router: Router,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
  ) {
    this.wines = [
      {
        title: 'Colossal Cave',
        type: 'Margaret River Cabernet Sauvignon',
        icon: 'https://media.danmurphys.com.au/dmo/product/85930-1.png?impolicy=PROD_SM',
      },
      {
        title: 'Xanadu',
        type: 'Reserve Cabernet Sauvignon',
        icon: 'https://media.danmurphys.com.au/dmo/product/964855-1.png?impolicy=PROD_SM'
      },
      {
        title: 'Flametree',
        type: 'Margaret River Cabernet Merlot',
        icon: 'https://media.danmurphys.com.au/dmo/product/917781-1.png?impolicy=PROD_SM'
      },
      {
        title: 'Cape Mentelle',
        type: 'Margaret River Cabernet Sauvignon',
        icon: 'https://media.danmurphys.com.au/dmo/product/91277-1.png?impolicy=PROD_SM'
      },
      {
        title: 'Woodlands',
        type: 'Cabernet Sauvignon',
        icon: 'https://media.danmurphys.com.au/dmo/product/909165-1.png?impolicy=PROD_SM'
      },
      {
        title: 'Ringbolt',
        type: 'Cabernet Sauvignon',
        icon: 'https://media.danmurphys.com.au/dmo/product/908634-1.png?impolicy=PROD_SM'
      },
    ];
  }
}