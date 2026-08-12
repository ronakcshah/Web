import {Directive} from '@angular/core';

@Directive({
    selector: '[appTestDirective]',
    standalone: false
})
export class TestDirectiveDirective {

  constructor() {
  }

}
