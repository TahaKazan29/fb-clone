import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  subs:Subscription[] = [];
  constructor(private authService:AuthService,private afAuth:AngularFireAuth,
    private router:Router,private matDialog:MatDialog) { }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subs.push(
      this.authService.userData.subscribe(user => {
        this.router.navigateByUrl('/').then();
      })
    )
  }

  login(form:NgForm) {
    const {email,password} = form.value;
    if(!form.valid) {
      return;
    }
    this.authService.SignIn(email,password);
    form.resetForm();
  }

  openRegister(){
    const dialogRef = this.matDialog.open(RegisterComponent,{
      role:'dialog',
      height:'480px',
      width:'480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const {fname, lname, email, password, avatar} = result;
      if (result !== undefined) {
        this.authService.SignUp(email, password, fname, lname, avatar);
      }
      else {
        return;
      }
    });

  }

}
