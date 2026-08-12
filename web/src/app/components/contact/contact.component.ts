import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    standalone: false
})

export class ContactComponent implements OnInit {

  model = new User();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    console.log(form.value);
  }

}

export class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

}
