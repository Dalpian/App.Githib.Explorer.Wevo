import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Detail } from '../models/detail';
import { Repos } from '../models/repos';
import { DetailService } from '../services/detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  detail: Detail;
  repos: Repos[];

  constructor(private detailService: DetailService,
    private activatedRoute: ActivatedRoute,
    ) { }

  subscription: Subscription;

  ngOnInit() {
    this.getDetail();
    this.getRepos();
  }
 
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
  
  getDetail() {
    this.subscription = this.activatedRoute.params.subscribe(p => {
      this.subscription = this.detailService.getDetail(p['username']).subscribe((rDetail: Detail) => {
      this.detail = rDetail;
    });
  })
  }

  getRepos() {
    this.subscription = this.activatedRoute.params.subscribe(p => {
      this.subscription = this.detailService.getRepos(p['username']).subscribe((rRepos: Repos[]) => {
      this.repos=rRepos;
    });
  })
  }
  
}
