import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  private todo : FormGroup;
  public api : RestService;

  constructor(public restapi: RestService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.todo = this.formBuilder.group({
            title: [''],
            description: [''],
          });
      this.api = restapi;
  }

  async saveTodo(){
    await this.api.createTodo(this.todo.value)
    .subscribe(res => {
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      });
  }

  save() {
    console.log(this.todo.value);
    this.saveTodo();

  }

  ngOnInit() {

  }

}
