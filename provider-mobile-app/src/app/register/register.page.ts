import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { User } from '../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  // Initializes two variables for modifying and sharing data between the front end and the server.
  user: User;
  userData: string;

  constructor(private http: HttpClient, private navCtrl: NavController) { }
  valEmail: String = "";
  valPass: String = "";
  valPassC: String = "";
  valFirstName: String = "";
  valLastName: String = "";
  response: String = "Please fill out all sections.";
  confirm: String = "false";

  // Checks if all values are inputted correctly, returns you to login, and uploads data to the server.
  createClicked() {
    this.http.get('http://localhost:5000/api/users/' + this.valEmail).subscribe((response) => {

      if (this.valEmail == "") { this.response = "Please enter a valid email." }
      else if (this.valPass == "") { this.response = "Please enter a password." }
      else if (this.valFirstName == "") { this.response = "Please enter a first name." }
      else if (this.valLastName == "") { this.response = "Please enter a last name." }
      else if (this.valPass != this.valPassC) { this.response = "Your passwords do not match." }
      else if (response[0]) { this.response = "Email is already registered as a Client or Host."; }
      else { this.confirm = "true" }
      console.log("im at the end of the tests")

      console.log("I'm after the tests")
      // If all the tests are passed, posts the data to the server, creating a new user, wtih host role on this app.
      if (this.confirm == "true") {
        console.log("I'm at the second if statement");
        this.http.post('http://localhost:5000/api/users/create',
          {
            userEmail: this.valEmail,
            userPassword: this.valPass,
            userFirstName: this.valFirstName,
            userLastName: this.valLastName,
            userRole: "host"
          }).subscribe((response) => {
            console.log(response);
          });
        this.navCtrl.navigateForward("/main");
      }
    })
  }

  // Go back to login Button.
  goBack() {
    this.navCtrl.navigateBack("/login");
  }

}
