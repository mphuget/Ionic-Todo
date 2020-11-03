import { Component } from '@angular/core';

import { LoadingController, NavController } from '@ionic/angular';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todos : any;
  api : RestService;

  constructor(public restapi: RestService, public loadingController: LoadingController, public navController : NavController) {

    this.api = restapi;
  }

  async getTodos() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    await this.api.getTodos()
      .subscribe(res => {
        console.log(res);
        this.todos = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

  }

  done(id: any) {
    console.log("done");
  }

  delete(id:any) {
    console.log("delete");
  }

  ngOnInit() {
    this.getTodos();
  }


}
