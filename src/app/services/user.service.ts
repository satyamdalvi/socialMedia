import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {

    public postData!:any

    set customData(data:any){
        this.postData = data;
    }

    get customData(){
        return this.postData;
    }

}