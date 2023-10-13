import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  User: any
  constructor(private userService: AuthService, private http: HttpClient ,private router:Router) {
    this.User = JSON.parse(localStorage.getItem('currentUser')!).data
    if(!localStorage.getItem('currentUser')){
      this.router.navigate(['/login']);
    }
  
   }

  ngOnInit(): void {
 
  }
}
