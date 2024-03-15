import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { port } from "backend-config";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})

export class LoginService {
	private baseUrl: string = `http://localhost:${port}/users/login`;
	private _httpHeaders = ({
		headers: new HttpHeaders({ "Content-Type": "application/json" }).set("Accept", "application/json"),
		withCredentials: true,
	})

	/**
	 * @author Rowen Zaal
	 * This constructor defines the http property.
	 * @param http is used to send requests to the backend.
	*/
	public constructor(private http: HttpClient) { }

	/**
	 * @author Rowen Zaal
	 * This method sends a login POST request to the baseUrl with the given email and password.
	 * @param email is the value of the email field from the loginform given by the user.
	 * @param password is the value of the password field from the loginform given by the user.
	 * @returns the response message received from the backend.
	*/
	public login(email: string, password: string): Observable<string> {
		return this.http.post<string>(this.baseUrl, { email, password }, this._httpHeaders)
	}
}