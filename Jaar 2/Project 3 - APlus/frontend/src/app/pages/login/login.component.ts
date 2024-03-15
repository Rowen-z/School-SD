import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginForm } from "src/app/interfaces/loginform";
import { LoginService } from "src/app/services/login/login.service";
@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})

export class LoginComponent {
	public loginForm: FormGroup;
	public passwordVisible: boolean = false;
	public showError: boolean = false;
	public errorMessage: string = "";

	/**
	 * @author Rowen Zaal
	 * Constructor used to define the login form and service. 
	 * @param formbuilder is an instance of FormControl.
	 * @param loginService is an import of the LoginService class.
	 * @param router provides the URL navigation of the site.
	*/
	public constructor(
		private formBuilder: FormBuilder,
		private loginService: LoginService,
		private router: Router
	) {
		this.loginForm = this.formBuilder.group({
			/**
			 * @param email get's checked for the following:
			 * Email has atleast 1 character before the '@'.
			 * Email contains a '@'.
			 * Email has atleast 1 character after the '@'.
			 * Email contains a '.' after the characters.
			 * Email contains atleast 2 characters after the '.'.
			 * Email doesn't contain any other special characters.
			 */
			email: ["", [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\$")]],
			password: ["", Validators.required]
		});
	}

	/**
	 * @author Rowen Zaal
	 * This method is used to toggle the password field by clicking the show/hide icon.
	*/
	public togglePassword(): void {
		this.passwordVisible = !this.passwordVisible;
	}

	/**
	 * @author Rowen Zaal
	 * In this method the login service is called when the email & password field have valid input.
	 * When no errors occured, user will be redirected to the homepage.
	 * If the backend gives the "Invalid input" or "Invalid credentials" error, errorMessage will be "Ongeldige gegevens".
	 * If an unexpected error occured in the backend, errorMessage will be "Er is iets misgegaan".
	*/
	public login(): void {
		const values: LoginForm = this.loginForm.value;

		if (values.email && values.password) {
			this.loginService.login(values.email, values.password).subscribe(
				(response: string) => {
					this.router.navigateByUrl("/");
				},
				(errorResponse: HttpErrorResponse) => {
					if (errorResponse.error.error == "Invalid input" || errorResponse.error.error == "Invalid credentials") {
						this.errorMessage = "Ongeldige gegevens";
						this.showErrorMessage();
					} else {
						this.errorMessage = "Er is iets misgegaan";
						this.showErrorMessage();
					}
				}
			);
		};
	}

	/**
	 * @author Rowen Zaal
	 * When this method is called, the showError property will be set to true. 
	 * After 3 seconds, the showError property will be set to false again.
	*/
	public showErrorMessage(): void {
		this.showError = true;
		setTimeout(() => {
			this.showError = false;
		}, 3000);
	}
}