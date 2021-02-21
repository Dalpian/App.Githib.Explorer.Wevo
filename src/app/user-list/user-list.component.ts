import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-detail',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[];
  subscription: Subscription;

  constructor(private usersService: UserService) {}
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.userList=users;
    });
  }

  excluir(id: any) {
      this.subscription = this.usersService.delUser(id).subscribe(r => {
        this.handleSuccess();
      }, e => {
        this.handleError(e);
      });
  }

  handleSuccess() {
    this.getUsers();
  }

  handleError(e) {
    alert(e);
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
  }

}