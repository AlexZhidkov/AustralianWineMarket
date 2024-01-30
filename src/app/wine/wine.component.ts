import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-wine',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatInputModule, MatFormFieldModule, MatProgressBarModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './wine.component.html',
  styleUrl: './wine.component.scss'
})
export class WineComponent {
  private firestore: Firestore = inject(Firestore);
  wineId: string;
  wineRef: DocumentReference<DocumentData>;
  wine: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
  ) {
    const wineId = this.route.snapshot.paramMap.get('wineId');
    if (!wineId) throw new Error("Wine ID is falsy");
    this.wineId = wineId;
    this.wineRef = doc(this.firestore, 'wines', this.wineId);
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
