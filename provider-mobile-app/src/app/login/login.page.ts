import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Listing } from '../model/listing.model';
import { User } from '../model/user.model';
import { UserInfoService } from '../services/user-info.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  // Initialization of the 2 variables that we'll use to import data.
  private user: User;
  userData: string;

  // Fluff/aesthetic based variables.
  buttonClicked: Boolean = false;
  colorWord: String = "dark";
  textField: string = "";
  usrVal: string = "";
  pasVal: string = "";
  usrValOutput: string = "";
  boolContinue: boolean = true;
  textContinue: string = "Please log into your host account to continue.";
  textContinue2: string = "";

  constructor(private http: HttpClient, private mainUser: UserInfoService, private navCtrl: NavController) { }

  //   ### Pre-API/mySql Based Logic ###
  //
  // logInClicked() {
  //   if (!this.buttonClicked) {
  //     if (this.usrVal.length > 0 && this.pasVal.length > 0) {
  //       this.colorWord = "success";
  //       this.textContinue = "Thank you for logging in ";
  //       this.usrValOutput = this.usrVal;
  //       this.textContinue2 = "! Please click continue.";
  //       this.boolContinue = false;
  //       // debugger;
  //       //this.globalService.setName(this.usrValOutput);
  //     }
  //     else {
  //       this.colorWord = "danger";
  //       this.textContinue = "Please enter a username and Password."
  //       this.usrValOutput = "";
  //       this.textContinue2 = "";
  //     }
  //   }
  // }

  // When login is clicked, API fetches the user with with the email entered into the Email box.
  logInClicked() {
    this.http.get('http://localhost:5000/api/users/' + this.usrVal).subscribe((response) => {
      // Janky way to parse response into a usable object array 'user' that can manipulated.
      this.userData = JSON.stringify(response);
      this.user = JSON.parse(this.userData);

      // Checks if the password entered, matches the password of the email in the database.
      // If an invalid email is entered, "this.user[0].userPassword" is undefined, so we use
      // "this.colorWord == "cheese" as an always-fail statement, to allow the if statement to continue to run.
      if (this.pasVal == this.user[0].userPassword && this.user[0].userRole == "host") 
      {
        this.colorWord = "success";
        this.textContinue = "Thank you for logging in ";
        this.usrValOutput = this.user[0].userFirstName;
        this.textContinue2 = "! Please click continue.";
        this.boolContinue = false;
        this.userData = this.user[0].userEmail;

        // Setting global info to tell the other pages what user has logged in.
        this.mainUser.setUserID(this.user[0].userID);
        this.mainUser.setUserEmail(this.user[0].userEmail);
        this.mainUser.setUserFirstName(this.user[0].userFirstName);
        this.mainUser.setUserLastName(this.user[0].userLastName);
      }
      // If insufficient info is entered, the log in button turns red and the text at the top changes.
      else {
        this.colorWord = "danger";
        this.textContinue = "Please enter a valid username and password."
        this.usrValOutput = "";
        this.textContinue2 = "";
      }
    })
  }

  // Register button clicked takes you to register page.
  registerClicked() {
    this.navCtrl.navigateForward("/register");
  }

  // Continue button clicked once activated.
  continueClicked() {
    this.navCtrl.navigateForward("/main");
  }
  //
}
