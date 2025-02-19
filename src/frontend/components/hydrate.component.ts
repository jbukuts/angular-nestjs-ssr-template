import { Component, ElementRef, ViewChild, afterNextRender } from '@angular/core';

@Component({
    selector: 'hydrate-component',
    template: `
        <div #content>
            <p>{{text}}</p>
        </div>
    `,
})
export class MyComponent {
    @ViewChild('content') contentRef!: ElementRef;
    text: string = 'Server-Side'  

    constructor() {
        afterNextRender(() => {
            console.log('content height: ' + this.contentRef.nativeElement.scrollHeight);
        });
    }

    ngOnInit(): void {
        this.text = 'Hydrated'
    }
}