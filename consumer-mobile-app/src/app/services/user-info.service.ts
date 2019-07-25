import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  // Service in order to hold the user's information after they log in.
  public mainID: number;
  public mainEmail: string;
  public mainFirstName: string;
  public mainLastName: string;

  constructor(private httpClient: HttpClient) {}

    // Set and get the user's ID
    setUserID(id: number)
    {
      this.mainID = id;
    }
    getUserID(): number
    {
      return this.mainID;
    }

    // Set and Get the user's email
    setUserEmail(email: string)
    {
      this.mainEmail = email;
    }
    getUserEmail(): string
    {
      return this.mainEmail;
    }

    // Set and get the user's first name.
    setUserFirstName(name: string)
    {
      this.mainFirstName = name;
    }
    getUserFirstName(): string
    {
      return this.mainFirstName;
    }

    // Set and get the user's last name.
    setUserLastName(name: string)
    {
      this.mainLastName = name;
    }
    getUserLastName(): string
    {
      return this.mainLastName;
    }

    // Removes all info
    setUserFlush()
    {
      this.mainID = 0;
      this.mainEmail = "";
      this.mainFirstName = "";
      this.mainLastName = "";
    }
}
