import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  min: number = 0;
  max: number = 0;
  step: number = 0.1;
  x: number = 100;

  numbers: { value: number, div: number, mod: number }[] = [];
  sortAscending: boolean | null = null;

  updateNumbers(): void {
    this.numbers = [];
    if (this.step <= 0 || this.x === 0) return;

    for (let i = this.min; i <= this.max; i += this.step) {
      const rounded = Math.round(i * 1000000) / 1000000;
      this.numbers.push({
        value: rounded,
        div: rounded / this.x,
        mod: this.x % rounded
      });
    }

    if (this.sortAscending !== null) {
      this.sortByMod(); // Keep current sort if already sorted
    }
  }

  sortByMod(): void {
    if (this.sortAscending === null || this.sortAscending === false) {
      this.numbers.sort((a, b) => a.mod - b.mod);
      this.sortAscending = true;
    } else {
      this.numbers.sort((a, b) => b.mod - a.mod);
      this.sortAscending = false;
    }
  }
}
