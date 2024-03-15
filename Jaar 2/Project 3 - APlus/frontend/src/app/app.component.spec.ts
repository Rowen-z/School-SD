import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

/**
 * Here are the tests for AppComponent
 * @author Ömer Aynaci
 * @author Anne Butter
 * @author Jacky Schoen
 */
describe("AppComponent", () => {
    let component: AppComponent;
    beforeEach(() =>
        TestBed.configureTestingModule({
            declarations: [AppComponent],
        })
    );

    it("should create the app", () => {
        expect(component).toBeTruthy;
    });
});
