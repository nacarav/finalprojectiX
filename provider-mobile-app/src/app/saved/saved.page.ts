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
  //formListing = new Listing(0,0,0,"","", "", "","","");
  alert: Listing;
  listingData: string;
  localHostID: number;
  formListing: Listing;

  constructor(private http: HttpClient, private mainUser: UserInfoService, private navCtrl: NavController, public alertCtrl: AlertController) {
    this.http.get('http://localhost:5000/api/listings/host/'+this.mainUser.getUserID()).subscribe((response) => {
      // Janky way to parse response into a usable object array that can manipulated.
      this.listingData = JSON.stringify(response);
      this.listing = JSON.parse(this.listingData);
      this.localHostID = this.mainUser.getUserID();
      this.formListing = this.listing[0];
    });
  }
  // Initializes variable with currently logged in user's ID, allowing the app to pull the listings connected to their ID.


  // Button on press that refreshes the listings on screen be calling the server again.
  refreshButton() {
    // Janky way to parse response into a usable object array that can manipulated.
    this.http.get('http://localhost:5000/api/listings/host/'+this.localHostID).subscribe((response) => {
      this.listingData = JSON.stringify(response);
      this.listing = JSON.parse(this.listingData);
    });
  }

  // Pop-up for adding a new listing, takes params, put them in json and uploads.
  async addListing() {
    //console.log("inside function");
    let alert = await this.alertCtrl.create({
      header: 'Add Listing',
      inputs: [
        {
          name: 'listingName',
          type: 'text',
          placeholder: 'Enter Listing Name'
        },
        {
          name: 'listingDescription',
          type: 'text',
          placeholder: 'Enter Listing Description'
        },
        {
          name: 'listingPrice',
          type: 'text',
          placeholder: 'Enter Listing Price'
        },
        {
          name: 'listingStart',
          type: 'text',
          placeholder: 'Enter Listing Start Date'
        },
        {
          name: 'listingEnd',
          type: 'text',
          placeholder: 'Enter Listing End Date'
        },
        {
          name: 'listingImgURL',
          type: 'text',
          placeholder: 'Enter Image URL'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Create Listing',
          handler: (alertData) => {
            console.log(alertData);
            this.formListing.listingHostID = this.localHostID;
            this.formListing.listingName = alertData.listingName;
            this.formListing.listingDescription = alertData.listingDescription;
            this.formListing.listingPrice = alertData.listingPrice;
            this.formListing.listingStart = alertData.listingStart;
            this.formListing.listingEnd = alertData.listingEnd;
            this.formListing.listingImgURL = alertData.listingImgURL;

            console.log("form listing after alert data, and before post: ", this.formListing);

            this.http.post('http://localhost:5000/api/listings/create', this.formListing).subscribe(() => {
            });
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  // Pop up alert that confirms you removing a listing from your account.
  async expandClicked(list) {
    const alert = await this.alertCtrl.create({
      header: list.listingName,
      subHeader: list.listingPrice,
      message: list.listingDescription,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Remove Listing',
          handler: () => {
            this.http.delete('http://localhost:5000/api/listings/delete/' + list.listingID).subscribe(() => {
            });
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

}
