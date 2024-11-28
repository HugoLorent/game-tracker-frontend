import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '../core/interfaces/collections.interface';
import { AuthenticationService } from '../core/services/authentication/authentication.service';
import { CollectionsService } from '../core/services/collections/collections.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public collections$: Observable<Collection[]>;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly collectionsService: CollectionsService
  ) {
    this.collections$ = this.collectionsService.getCollections(
      this.authenticationService.user$.getValue()!.sub
    );
  }
}
