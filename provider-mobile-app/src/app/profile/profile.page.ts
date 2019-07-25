import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { UserInfoService } from '../services/user-info.service';
import { User } from '../model/user.model';
import { NavController } from '@ionic/angular';
import { Listing } from '../model/listing.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage{
    // Initialization of the 2 variables that we'll use to show the user's first and last name on the settings page.
    firstName: string = "defaultFirst";
    lastName: string = "defaultLast";

    // Assigning the logged in user's info to the variables in the class.
  constructor(private http: HttpClient, private mainUser: UserInfoService, private navCtrl: NavController, public alertController: AlertController) { 
      this.firstName = this.mainUser.getUserFirstName();
      this.lastName = this.mainUser.getUserLastName();
   }
  }


