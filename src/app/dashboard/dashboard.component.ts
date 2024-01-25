import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostComponent } from '../create-post/create-post.component';
import postData  from '../../assets/data/staticData.json'
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  public postedData:any;

  constructor(private modalService: NgbModal, private userService: UserService, private cookie: CookieService, private router: Router){}

  ngOnInit(): void {
    
    this.postedData = postData

    this.postedData = this.userService.customData
    
    if(this.postedData === undefined){
      const data =  localStorage.getItem('postData')
      if(data){
        this.postedData = JSON.parse(data)
      }
    }
  }

  crudPost(type:any, data:any = ''){

    const modalRef = this.modalService.open(CreatePostComponent);
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.type = type;

    modalRef.result.then((res:any)=>{
      if(res.isProceed){
        if(type === 'add'){

          const data = {
            serialNumber: this.postedData.length+1, 
            body: res.formData.controls.body.value,
            title: res.formData.controls.title.value,
            tags: res.formData.controls.tags.value,
            active: res.formData.controls.checkbox.value==true?true:false,
          }


          this.postedData.unshift(data)
          this.userService.customData = this.postedData
          localStorage.removeItem('postData')
          localStorage.setItem('postData', JSON.stringify(this.postedData))
        }else if(type === 'edit'){

          this.postedData = this.postedData.map((item:any)=> item.serialNumber === res.serialData?{
            serialNumber: res.serialData,
            title: res.formData.controls.title.value,
            body: res.formData.controls.body.value,
            tags: res.formData.controls.tags.value,
            active: res.formData.controls.checkbox.value==true?true:false,
          }:item)

          this.userService.customData = this.postedData
          localStorage.removeItem('postData')
          localStorage.setItem('postData', JSON.stringify(this.postedData))

        } else if(type === 'delete'){
          
          this.postedData = this.postedData.filter((item:any) => item.serialNumber !== res.serialData)
          
          this.userService.customData = this.postedData
          localStorage.setItem('postData', JSON.stringify(this.postedData))

        }
      }
    })

  }

  logout(){
    

    localStorage.removeItem('postData')
    this.cookie.deleteAll('/');
    
    this.router.navigate([''])

  }

}
