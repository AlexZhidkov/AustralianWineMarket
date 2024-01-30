import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DocumentReference, DocumentData, doc, getDoc, Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Wine } from '../models/wine';
import { WineListComponent } from '../wine-list/wine-list.component';

@Component({
  selector: 'app-org',
  standalone: true,
  imports: [CommonModule, RouterModule, WineListComponent, MatProgressBarModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatListModule],
  templateUrl: './org.component.html',
  styleUrl: './org.component.scss'
})
export class OrgComponent {
  private firestore: Firestore = inject(Firestore);
  orgId: string;
  orgRef: DocumentReference<DocumentData>;
  org: any;
  wines: Wine[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
  ) {
    const orgId = this.route.snapshot.paramMap.get('orgId');
    if (!orgId) throw new Error("Org ID is falsy");
    this.orgId = orgId;
    this.orgRef = doc(this.firestore, 'orgs', orgId);
  }

  async ngOnInit(): Promise<void> {
    this.org = (await getDoc(this.orgRef)).data();
    await this.getOrgWines();
  }

  private async getOrgWines() {
    const promises: any[] = [];
    collectionData(query(collection(this.firestore, 'orgs', this.orgId, 'wines')), { idField: 'id' })
      .pipe().subscribe(async (wines) => {
        wines.forEach((wine) => {
          promises.push(getDoc(doc(this.firestore, 'wines', wine.id)));
        })

        this.wines = await Promise.all(promises).then((snapshots) => {
          let allWines = [];
          for (const doc of snapshots) {
            const wine = doc.data() as Wine;
            wine.id = doc.id;
            allWines.push(wine);
          }
          return allWines;
        });
        this.isLoading = false;
      });
  }

}
