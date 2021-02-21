import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserGithub } from '../models/user-github';
import { UsersGithub } from '../models/users-github';
import { UsersGithubService } from '../services/users-github.service';
@Component({
  selector: 'app-detail',
  templateUrl: './users-github.component.html',
  styleUrls: ['./users-github.component.css']
})
export class UsersGithubComponent implements OnInit {
  
  user = {} as UserGithub;
  users: UsersGithub;
  userList: UserGithub[];

  constructor(private usersService: UsersGithubService) {}
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((users: UsersGithub) => {
      this.users = users;
      this.userList = users.userList;
    });
  }

  nextPage() {
    this.usersService.getUsersNextPage(this.users.nextPage).subscribe((users: UsersGithub) => {
      this.users = users;
      this.userList = users.userList;
    });
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
  }

}