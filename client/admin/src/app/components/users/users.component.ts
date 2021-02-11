import { Component, Input, OnInit } from '@angular/core';
 import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { Router,ActivatedRoute } from '@angular/router';
import {RefreshService} from '../../services/refresh.service';
import { addUser } from 'src/app/models/addUser';
import { Users2 } from '../../models/users';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: Users[] = [];
  user: Users;
  searchU: string;
  searchF:string;
  searchL:string;
  searchE:string;
 

  constructor(private usersService: UsersService,
              private rout:Router,
              private ref:RefreshService) {}

  ngOnInit(): void {
    this.load();

  }

  load() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  
  onDelete(_id:number) {
    this.usersService.deleteUser(_id).subscribe(() => {
      this.users = null;
      this.load();
    });

  }

  editUs(id:number){
    this.rout.navigate(['/users', id]);
    
  }

  searchUser(username:string, firsN:string,lastName:string, email:string){
        console.log(username);
        
       this.usersService.getUserByParam(username,firsN,lastName,email).subscribe(data=>{
        this.users=data;
    });


  }





}
