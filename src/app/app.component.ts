import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipeblog';

  loginsuccess:boolean=false;

  ngOnInit(): void {
    //debugger;
    if(sessionStorage.getItem("CurrentLogin"))
        this.loginsuccess= true;
        else
        this.loginsuccess= false;
  }

}
