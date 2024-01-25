import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit{

  @Input() public data:any;
  @Input() public type:any;
  submitValidation:boolean=true
  public loading:boolean = false;
  public modalLoading:boolean=false;
  postForm!: FormGroup
  public selectedData: any[] = ['#pune', '#surat', '#mumbai', '#delhi', "#new-york", "#london", "#paris", "#tokyo", "#beijing", "#sydney", "#san-francisco", "#seoul", "#bangkok", "#vancouver", "#auckland", "#cape-town", "#los-angeles", "#mexico-city", "#rio-de-janeiro", "#rome", "#athens", "#cairo", "#berlin", "#madrid", "#lisbon"];
  tags: any[] = [];

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder){}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      body: ['', [Validators.required, Validators.minLength(6)]],
      tags: [[], [Validators.required]],
      checkbox: [''],
    })

    if(typeof(this.data) == 'object'){

      this.postForm.patchValue({
        title: this.data.title,
        body: this.data.body,
        tags: this.data.tags,
        checkbox: this.data.active
      })

      setTimeout(()=>{
        this.modalLoading = true
      },3000)

    }

  }

  dataSelected(){

  }

  onClearAll(){

  }

  handleCallback(val: boolean, type:any) {


      if(type === 'add' || type === 'edit'){
        if(this.postForm.valid){
          this.activeModal.close({ isProceed: val, formData: this.postForm, serialData: this.data.serialNumber });
        }
      }else {
        this.activeModal.close({ isProceed: val, formData: this.postForm, serialData: this.data.serialNumber });
      }
    }

  onSubmit(form: FormGroup){
    if(form.valid){


    }
  }

}
