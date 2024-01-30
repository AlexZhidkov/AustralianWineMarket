import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, DocumentReference, DocumentData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Wine } from '../models/wine';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-org-wine',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatProgressBarModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './org-wine.component.html',
  styleUrl: './org-wine.component.scss'
})
export class OrgWineComponent {
  private firestore: Firestore = inject(Firestore);
  wineId: string;
  wineRef: DocumentReference<DocumentData>;
  orgId: string;
  orgWineRef: DocumentReference<DocumentData>;
  wine: Wine | undefined;
  orgWine: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
  ) {
    const orgId = this.route.snapshot.paramMap.get('orgId');
    if (!orgId) throw new Error("Org ID is falsy");
    this.orgId = orgId;
    const wineId = this.route.snapshot.paramMap.get('wineId');
    if (!wineId) throw new Error("Wine ID is falsy");
    this.wineId = wineId;
    this.wineRef = doc(this.firestore, 'wines', this.wineId);
    this.orgWineRef = doc(this.firestore, 'orgs', this.orgId, 'wines', this.wineId);
  }

  async ngOnInit(): Promise<void> {
    this.wine = (await getDoc(this.wineRef)).data() as Wine;
    if (!this.wine) throw new Error('User object is falsy');
    this.orgWine = (await getDoc(this.orgWineRef)).data();
    this.isLoading = false;
  }

  updateOrgWine(data: any) {
    updateDoc(this.orgWineRef as DocumentReference<DocumentData>, data)
  }

}
