import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isFavoriteClicked: boolean = false;
  UsersData: any = []
  searchQuery: string = '';
  Users: any[] = []; // Your list of Users
  filteredUsers: any[] = [];
  addUserForm!: FormGroup;
  editUserForm!: FormGroup;
  selectedUser: any; // Property to store the selected User for editing
  name: any
  page: any = 1
  total_data!: number;
  limit: any
  total_page!: number
  serachForm!: FormGroup
  search: string = ''
  indexNumber = 1
  companies = ['Trishala', 'Shanti', 'F-31'];

  constructor(private fb: FormBuilder, private userService: AuthService, private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit(): void {
    this.page = 1; // Initialize with the first page
    this.limit = 10; // Set an appropriate initial limit
    const userData = JSON.parse(localStorage.getItem('currentUser')!)
    this.name = userData?.data.full_name
    this.addForminit()
    this.addForminit()
    this.getUsers()
  }

  get f() { return this.addUserForm.controls; }
  addForminit() {
    this.addUserForm = this.fb.group({
      UserName: ['', Validators.required],
      address: ['', [Validators.required]],
      mobile_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      company: ['', Validators.required]
    });
  }

  editFormInit(User: any) {
    this.selectedUser = User;
    this.editUserForm = this.fb.group({
      UserName: [Validators.required],
      address: [Validators.required],
      mobile_number: [Validators.required],
      email: [ Validators.required, Validators.email],
      company: ['', Validators.required]
    });
      // Example usage to set all values using patchValue
      this.editUserForm.patchValue({
        UserName: User.name,
        address: User.address,
        mobile_number: User.mobile_number,
        email: User.email,
        company: User.company_name,
      });
  }




  closeResult: string | undefined;
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'myModalLabel' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  // addToFavorites(User: any) {
  //   const formData = new FormData();
  //   formData.append('name', User.UserName);
  //   formData.append('address', User.address);
  //   formData.append('mobile_number', User.mobile_number);
  //   formData.append('email', User.email);
  //   formData.append('compnay_name', User.compnay)
  //   this.userService.addUsers(formData).subscribe((res: any) => {
  //     if (res.status == "success") {
  //       this.modalService.dismissAll()
  //       this.ngOnInit()
  //       Swal.fire({ icon: 'success', title: res.message, confirmButtonColor: '#d90000' })
  //     }
  //   })
  // }
  onFormSubmit() {
    if (this.addUserForm.valid) {
      const formData = new FormData();
      formData.append('name', this.addUserForm.get('UserName')?.value);
      formData.append('address', this.addUserForm.get('address')?.value);
      formData.append('mobile_number', this.addUserForm.get('mobile_number')?.value);
      formData.append('email', this.addUserForm.get('email')?.value);
      formData.append('password', this.addUserForm.get('password')?.value);
      formData.append('company_name', this.addUserForm.get('company')?.value)
      this.userService.addUsers(formData).subscribe((res: any) => {
        if (res.status == "success") {
          this.modalService.dismissAll()
          this.ngOnInit()
          Swal.fire({ icon: 'success', title: res.message, confirmButtonColor: '#d90000' })
        }
      })
    } else {
      this.addUserForm.markAllAsTouched();
    }
  }
  openEditModal(editUser: any, User: any) {
    this.editFormInit(User); // Populate the form with the selected User data
    this.modalService.open(editUser, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        // Handle modal close
      },
      (reason) => {
        // Handle modal dismiss
      }
    );
  }

  onUpdateSubmit() {
    if (this.editUserForm.valid) {
      const formData = new FormData();
      // Add the updated form data
      formData.append('name', this.editUserForm.get('UserName')?.value);
      formData.append('address', this.editUserForm.get('address')?.value);
      formData.append('mobile_number', this.editUserForm.get('mobile_number')?.value);
      formData.append('email', this.editUserForm.get('email')?.value);
      formData.append('company_name', this.editUserForm.get('company')?.value);
      this.userService.editusers(formData, this.selectedUser._id).subscribe((res: any) => {
        if (res.status == 'success') {
          this.modalService.dismissAll();
          this.ngOnInit();
          Swal.fire({ icon: 'success', title: res.message, confirmButtonColor: '#d90000' });
        }
      });
    } else {
      this.editUserForm.markAllAsTouched();
    }
  }
  deleteUser(User: any) {
    // Show a confirmation dialog using Swal
    Swal.fire({
      title: 'Confirm Deletion',
      text: `Are you sure you want to delete "${User.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the deletion, proceed with API call
        this.userService.deleteusers(User._id).subscribe((res: any) => {
          if (res.status === 'success') {
            // Remove the deleted User from the UsersData array
            this.ngOnInit()
            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: `The User ${User.name} has been deleted.`,
              confirmButtonColor: "#d33"
            });
          } else {
            Swal.fire('Error', 'An error occurred while deleting the User.', 'error');
          }
        });
      }
    });
  }
  logout() {
    this.userService.logout()
    window.location.reload()
  }
  getUsers() {
    const formData = new FormData();
    formData.append('page', this.page);
    formData.append('limit', this.limit);
    this.userService.getusers().subscribe((res: any) => {
      if (res.status == "success") {
        this.UsersData = res.user_data
      }
    })
  }
}
