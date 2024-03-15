import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";

/**
 * Tests for the header component.
 * @author Jacky Schoen
 * @author Bruce Bodaar
 * @author Rowen Zaal
 */
describe("HeaderComponent", () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
        declarations: [HeaderComponent]
        });
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("isHidden property should be true by default", () => {
        expect(component.isHidden).toBeTrue();
    });

    it("Toggling isHidden property once should be false", () => {
        component.toggleDropdown();
        expect(component.isHidden).toBeFalse();
    });

    it("Toggling isHidden property twice should be true", () => {
        component.toggleDropdown();
        component.toggleDropdown();
        expect(component.isHidden).toBeTrue();
    });
});
