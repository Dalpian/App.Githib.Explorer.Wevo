import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersGithubComponent } from './users-github/users-github.component';


const routes: Routes = [
{path: '', component: UserListComponent },
{path: 'detail/:username', component: DetailComponent },
{path: 'users', component: UsersGithubComponent },
{path: 'user-add', component: UserAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
