import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";

import { LoginService } from "./login.service";
import { port } from "backend-config";
import { LoginForm } from "src/app/interfaces/loginform";
import { MockResponse } from "src/app/interfaces/mockresponse";

/**
 * @author Rowen Zaal
 * Tests for the login service.
 */
describe("LoginService", () => {
	let service: LoginService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [LoginService]
		});

		service = TestBed.inject(LoginService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should send a login request and return a status 200 response containing 'Login succesful' on success", () => {
		const mockResponse: MockResponse = { status: 200, statusText: "Login succesful" }
		const mockLoginData: LoginForm = { email: "kees@admin.com", password: "Testpassword123!" };

		service.login(mockLoginData.email, mockLoginData.password).subscribe((data) => {
			expect(data).toEqual("Login succesful");
		});

		const request: TestRequest = httpTestingController.expectOne(`http://localhost:${port}/users/login`);
		expect(request.request.method).toBe("POST");
		expect(request.request.body).toEqual(mockLoginData);
		request.flush(mockResponse.statusText);
	});

	it("should send a login request and return a status 400 error when either email or password fields have invalid input", () => {
		const mockError: MockResponse = { status: 400, statusText: "Invalid input" };
		const mockLoginData: LoginForm = { email: "Invalid", password: "Invalid" };

		service.login(mockLoginData.email, mockLoginData.password).subscribe(
			() => { },
			(error) => {
				expect(error.status).toBe(400);
				expect(error.statusText).toBe("Invalid input");
			}
		);

		const request: TestRequest = httpTestingController.expectOne(`http://localhost:${port}/users/login`);
		request.flush(mockError);
	});

	it("should send a login request and return a status 401 error when email and password are valid but they don't match with an existing account in the database", () => {
		const mockError: MockResponse = { status: 401, statusText: "Invalid credentials" };
		const mockLoginData: LoginForm = { email: "kees@admin.com", password: "Incorrectpassword!" };

		service.login(mockLoginData.email, mockLoginData.password).subscribe(
			() => { },
			(error) => {
				expect(error.status).toBe(401);
				expect(error.statusText).toBe("Invalid credentials");
			}
		);

		const request: TestRequest = httpTestingController.expectOne(`http://localhost:${port}/users/login`);
		request.flush(mockError);
	});
});
