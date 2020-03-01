import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-donuts',
  templateUrl: './donuts.component.html',
  styles: []
})
export class DonutsComponent implements OnInit {

  // Doughnut
  @Input()  ChartLabels: Label[] = [];
  @Input() ChartData: MultiDataSet = [
  ];
  @Input()  ChartType: ChartType = null;
  constructor() { }

  ngOnInit() {
    
  }

}
