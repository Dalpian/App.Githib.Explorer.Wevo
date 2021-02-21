import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

constructor(private usersService: UserService, private location: Location) {}
  
  user: User = new User();
  subscription: Subscription;

  ngOnInit() {
    // this.getUsers();
  }

  salvar() {
    if (this.user.id) {
      this.subscription = this.usersService.putUser(this.user).subscribe(r => {
        this.handleSuccess();
      }, e => {
        this.handleError(e);
      });
    } else {
      this.subscription = this.usersService.addUser(this.user).subscribe(r => {
        this.handleSuccess();
      }, e => {
        this.handleError(e);
      });
    }
  }

  cancelar() {
    this.location.back();
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    form.resetForm();
  }

  handleSuccess() {
    this.location.back();
  }

  handleError(e) {
    alert(e);
  }

}