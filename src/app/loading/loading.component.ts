import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  loading_gif_url = '../../assets/loading.gif'
  constructor() { }

  ngOnInit() {
  }

}
