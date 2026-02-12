import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root',
})

export class UrlsList {
 

   registerUser = "api/auth/register"
   loginUser = "api/auth/login"
   getUserList = "api/user/users"


}