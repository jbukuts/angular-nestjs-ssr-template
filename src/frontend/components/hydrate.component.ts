import {
  Component,
  ElementRef,
  ViewChild,
  afterNextRender,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-hydrate-component',
  template: `
    <div #content>
      <p>{{ text }}</p>
    </div>
  `,
  styles: [
    `
      @use 'mixins' as *;

      div {
        @include content-area(teal);
        margin-bottom: 1rem;

        & p {
          margin: 0;
        }
      }
    `
  ]
})
export class HydrateComponent implements OnInit {
  @ViewChild('content') contentRef!: ElementRef;
  text = 'Server-Side';

  constructor() {
    afterNextRender(() => {
      console.log(
        'content height: ' + this.contentRef.nativeElement.scrollHeight
      );
    });
  }

  ngOnInit(): void {
    this.text = 'Hydrated!';
  }
}
