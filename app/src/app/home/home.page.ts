import { Component } from '@angular/core';

import { LoadingController, NavController } from '@ionic/angular';
import { RestService } from '../rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todos : any;
  api : RestService;

  constructor(public restapi: RestService, 
    public loadingController: LoadingController, 
    public navController : NavController, 
    public router : Router) {

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
        this.todos = res.filter((aTodo) => {
          return aTodo.done == false
        });
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

  }

  async deleteTodo(id:any){
    await this.api.deleteTodo(id)
    .subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  async doneTodo(id:any){
    await this.api.doneTodo(id)
    .subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  done(id: any) {
    console.log("done");
    this.doneTodo(id);
  }

  delete(id:any) {
    this.deleteTodo(id);
  }

  ngOnInit() {
    this.getTodos();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

}
