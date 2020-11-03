import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestService } from '../rest.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  todo : any;
  api : RestService;
  id : string;

  constructor(public restapi: RestService, public loadingController: LoadingController, private route: ActivatedRoute) {

    this.api = restapi;

  }

  async getTodo(id:any) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    await this.api.getTodo(this.id)
      .subscribe(res => {
        console.log(res);
        this.todo = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

  }

  save() {

  }

  delete() {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap)=> {
      this.id=params.get('id');
    });
    console.log("Current id: " + this.id);
    this.getTodo(this.id);
  }
}
