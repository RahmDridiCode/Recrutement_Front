import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user:any;
  imagePreview:any=null
  userForm:any;
  constructor(private authService: AuthService, private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = this.authService.loggedUser;
    this.userForm = new FormGroup({
      firstName:new FormControl(this.user["firstName"],[Validators.required]),
      lastName:new FormControl(this.user["lastName"],[Validators.required]),
      username: new FormControl(this.user["username"],[Validators.required]),
      address: new FormControl(this.user["address"],[Validators.required]),
      phone: new FormControl(this.user["phone"],[Validators.required]),
      image:new FormControl(''),
    });
    this.imagePreview=this.user.image;
  }

  onImagePicked(imageInput: any,prev:any) {
    const file : File = imageInput.files[0];
    this.userForm.patchValue({image: file});
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview=reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.userForm.valid) {
      this.authService.updateUser({ id: this.user.id, ...this.userForm.value })
        .subscribe({
          next: (result) => {
            this.toastr.success('Profil mis à jour avec succès !', 'Succès');
            this.authService.loggedUser = result;
            this.router.navigate(["/profile"]);
          },
          error: (err) => {
            this.toastr.error('Une erreur est survenue. Veuillez réessayer.', 'Échec');
            console.error(err);
          }
        });
    } else {
      this.toastr.warning('Veuillez vérifier les champs du formulaire.', 'Attention');
    }
  }


}
