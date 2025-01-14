import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight: boolean = false;  // Bind the input to todo.completed

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighlight']) {
      this.updateHighlight();
    }
  }

  private updateHighlight(): void {
    if (this.appHighlight) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fecaca');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }
}
