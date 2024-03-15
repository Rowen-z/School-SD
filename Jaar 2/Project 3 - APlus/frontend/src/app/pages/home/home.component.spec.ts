import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";

/**
 * Here are the tests for the HomeComponent
 * @author Ömer Aynaci
 * @author Anne Butter
 * @author Jacky Schoen
 */
describe("HomeComponent", () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent]
        });
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
