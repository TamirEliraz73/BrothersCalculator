import {Component, OnInit} from '@angular/core';
import {setSort, setSortDiv, setSortId, setSortMod, setSortValue, Sort} from './types';
import {enLabels, heLabels, Labels} from './texts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.updateNumbers();
  }

  currentLang: 'en' | 'he' = 'en';
  labels: Labels = enLabels;

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'he' : 'en';
    this.updateLanguageTexts();
    document.documentElement.dir = this.currentLang === 'he' ? 'rtl' : 'ltr';
  }

  public updateLanguageTexts(): void {
    this.labels = this.currentLang === 'he' ? heLabels : enLabels;
  }

  min: number = 40;
  max: number = 60;
  step: number = 0.1;
  x: number = 200;
  info: boolean = false;

  numbers: { id: number, value: number, div: number, mod: number }[] = [];
  sorts: Sort = setSort();

  public updateNumbers(): void {
    this.numbers = [];
    if (this.step <= 0 || this.x === 0) return;
    let _id: number = 0;

    for (let i = this.min; i <= this.max; i += this.step) {
      const rounded = Math.round(i * 1000000) / 1000000;
      this.numbers.push({
        id: ++_id,
        value: rounded,
        div: rounded / this.x,
        mod: this.x % rounded
      });
    }

    if (this.sorts !== null) {
      if (this.sorts.id !== null) {
        this.sortById();
      } else if (this.sorts.value !== null) {
        this.sortByValue();
      } else if (this.sorts.div !== null) {
        this.sortByDiv();
      } else if (this.sorts.mod !== null) {
        this.sortByMod(); // Keep current sort if already sorted
      }
    }
  }

  public unSort(): void {
    this.sortById();
    this.sorts = setSort();
  }

  public setDefaultValues(): void {
    this.min = 40;
    this.max = 60;
    this.step = 0.1;
    this.x = 200;
    this.updateNumbers();
  }

  public setInformation(): void {
    this.info = !this.info;
  }

  public sortByMod(): void {
    if (this.sorts.mod === null || !this.sorts.mod) {
      this.numbers.sort((a, b) => a.mod - b.mod);
      this.sorts = setSortMod();
      this.sorts.mod = true;
    } else {
      this.numbers.sort((a, b) => b.mod - a.mod);
      this.sorts = setSortMod();
      this.sorts.mod = false;
    }
  }

  public sortById(): void {
    if (this.sorts.id === null || !this.sorts.id) {
      this.numbers.sort((a, b) => a.id - b.id);
      this.sorts = setSortId();
      this.sorts.id = true;
    } else {
      this.numbers.sort((a, b) => b.id - a.id);
      this.sorts = setSortId();
      this.sorts.id = false;
    }
  }

  public sortByDiv(): void {
    if (this.sorts.div === null || !this.sorts.div) {
      this.numbers.sort((a, b) => a.div - b.div);
      this.sorts = setSortDiv();
      this.sorts.div = true;
    } else {
      this.numbers.sort((a, b) => b.div - a.div);
      this.sorts = setSortDiv();
      this.sorts.div = false;
    }
  }

  public sortByValue(): void {
    if (this.sorts.value === null || !this.sorts.value) {
      this.numbers.sort((a, b) => a.value - b.value);
      this.sorts = setSortValue();
      this.sorts.value = true;
    } else {
      this.numbers.sort((a, b) => b.value - a.value);
      this.sorts = setSortValue();
      this.sorts.value = false;
    }
  }
}
