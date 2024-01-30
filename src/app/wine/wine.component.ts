import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-wine',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatInputModule, MatFormFieldModule, MatProgressBarModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './wine.component.html',
  styleUrl: './wine.component.scss'
})
export class WineComponent {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  user: AppUser | null = null;
  wineId: string;
  wineRef: DocumentReference<DocumentData>;
  wine: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const wineId = this.route.snapshot.paramMap.get('wineId');
    if (!wineId) throw new Error("Wine ID is falsy");
    this.wineId = wineId;
    this.wineRef = doc(this.firestore, 'wines', this.wineId);

    onAuthStateChanged(this.auth, async (user) => {
      if (!user) {
        console.error('User object is falsy');
        return;
      }
      this.user = (await getDoc(doc(this.firestore, 'users', user.uid))).data() as AppUser;
    });

  }

  async ngOnInit(): Promise<void> {
    this.wine = (await getDoc(this.wineRef)).data();
    if (!this.wine) {
      setDoc(this.wineRef, { title: '' });
      this.wine = {};
    }
    this.isLoading = false;
  }

  updateWine(data: any) {
    updateDoc(this.wineRef as DocumentReference<DocumentData>, data)
  }

  addToOrg() {
    if (!this.user) throw new Error("User is falsy");
    const docRef = doc(this.firestore, 'orgs', this.user.org, 'wines', this.wineId);
    setDoc(docRef, { price: null }).then(() => {
      this.router.navigate(['org', this.user?.org, 'wine', this.wineId]);
    });
  }

  share() {
    const wineUrl = `${window.location.origin}/wine/${this.wineId}`;
    if (navigator.share) {
      navigator.share({
        text: `Check out this wine`,
        url: wineUrl
      })
    }
  }

}
