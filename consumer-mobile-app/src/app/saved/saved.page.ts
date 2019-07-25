import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { UserInfoService } from '../services/user-info.service';
import { User } from '../model/user.model';
import { NavController } from '@ionic/angular';
import { Listing } from '../model/listing.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage {
  // Initialization of the 2 variables that we'll use to import data.
  private listing: Listing;
  listingData: string;

  constructor(private http: HttpClient, private mainUser: UserInfoService, private navCtrl: NavController, public alertController: AlertController) {
    this.http.get('http://localhost:5000/api/listings/client/' + this.localClientID).subscribe((response) => {
      // Janky way to parse response into a usable object array that can manipulated.
      this.listingData = JSON.stringify(response);
      this.listing = JSON.parse(this.listingData);
    });
  }
  // Initializes variable with currently logged in user's ID, allowing the app to pull the listings connected to their ID.
  localClientID = this.mainUser.getUserID();

  // Button on press that refreshes the listings on screen be calling the server again.
  refreshButton() {
          // Janky way to parse response into a usable object array that can manipulated.
    this.http.get('http://localhost:5000/api/listings/client/' + this.localClientID).subscribe((response) => {
      this.listingData = JSON.stringify(response);
      this.listing = JSON.parse(this.listingData);
    });
  }

  // Pop up alert that confirms you removing a listing from your account.
  async expandClicked(list) {
    list.listingClientID = 0;
    const alert = await this.alertController.create({
      header: list.listingName,
      subHeader: list.listingPrice,
      message: list.listingDescription,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Remove',
          handler: () => {
            this.http.post('http://localhost:5000/api/listings/update/', list).subscribe(() => {
            });
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

}
