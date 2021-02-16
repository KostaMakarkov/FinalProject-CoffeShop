
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ContactUs } from '../contact-us';
import { faCheckDouble, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private router:Router, private api:ApiService) { }

  contactForm:FormGroup;
  checkIcon = faCheckDouble;
  backIcon = faArrowAltCircleLeft;
  activateIcon = false;

  sendEmail(){
    const newContact = new ContactUs(
      this.contactForm.controls.fullName.value,
      this.contactForm.controls.email.value,
      this.contactForm.controls.phone.value,
      this.contactForm.controls.title.value,
      this.contactForm.controls.content.value,
    )
    this.activateIcon = true;
    this.api.sendEmail(newContact).subscribe();
    this.router.navigate(['/']);
  }
  checkNum(control:FormControl): {[key:string]: boolean} {
    let phoneNumber = {'phone': String(control.value)};
    let phoneNumberLength = phoneNumber.phone.length;
    if(phoneNumberLength == 9){
    return null
    }
    else return {'Validation' : false}
  
  };

  goBackTo(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      'fullName': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.required, this.checkNum]),
      'title': new FormControl('',[Validators.required, Validators.minLength(3)]),
      'content': new FormControl('',[Validators.required, Validators.minLength(3)])
    });
  }

}
