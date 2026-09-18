import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  greeting = '';
  error = '';
  loading = true;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getUser().subscribe({
      next: (text) => {
        this.greeting = text;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to reach the API';
        this.loading = false;
      }
    });
  }

}
