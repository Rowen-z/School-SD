import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RubricComponent } from "./rubric.component";

import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

/**
 * Tests for the Rubric component 
 * @author Jacky Schoen
 * @author Bruce Bodaar
 * @author Rowen Zaal
 * @author Anne Butter
 */
describe("RubricComponent", () => {
    let formBuilder: FormBuilder = new FormBuilder
    let component: RubricComponent = new RubricComponent(formBuilder);
    let fixture: ComponentFixture<RubricComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RubricComponent],
            imports: [ReactiveFormsModule]
        });
        fixture = TestBed.createComponent(RubricComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should create a form group in the rubricForm with 3 column title controls", () => {
        component.createFormGroupColumnTitles()
        const columnTitlesControl: AbstractControl<string, string> | null = component.rubricForm.get("columnTitles");
        const columnTitleControlsArray: (AbstractControl<string, string> | null | undefined)[] = [];
        for ( let i : number = 0; i < 3; i++){
            columnTitleControlsArray.push(columnTitlesControl?.get("columnTitle" + i));
        }
        expect(columnTitleControlsArray).not.toContain(null);
    });

    it("should create a form group in the rubricForm with 5 row controls", () => {
        component.createFormGroupRows()
        const tableRowsControl: AbstractControl<string, string> | null = component.rubricForm.get("tableRows");
        const rowControlsArray: (AbstractControl<string, string> | null | undefined)[] = [];
        for ( let i : number = 1; i < 6; i++){
            rowControlsArray.push(tableRowsControl?.get("row" + i));
        }
        expect(rowControlsArray).not.toContain(null);
    });

    it("should create and return a form group with 3 column controls for every row", () => {
        const columnFormGroup: FormGroup = component.createFormGroupCells();

        const tableRowsControl: AbstractControl<string, string> | null = component.rubricForm.get("tableRows");
        const rowControlsArray: (AbstractControl<string, string> | null | undefined)[] = [];
        const columnControlsArray = [];
        for ( let i : number = 1; i < 6; i++){
            const rowControl: AbstractControl<string, string> | null | undefined = tableRowsControl?.get("row" + i);
            rowControlsArray.push(rowControl);
            for ( let j : number = 0; j < 3; j++) {
                columnControlsArray.push(rowControl?.get("cell" + j))
            }
        }

        expect(columnFormGroup).toBeInstanceOf(FormGroup);
        expect(rowControlsArray && columnControlsArray).not.toContain(null);
    });

    it("should get an array with column titles", () => {
        component.createFormGroupColumnTitles();
        expect(component.getColumnTitleKeys).toEqual(["columnTitle0", "columnTitle1", "columnTitle2"]);
    });

    it("should get an array with row keys", () => {
        component.createFormGroupRows();
        expect(component.getRowKeys).toEqual(["row1", "row2", "row3", "row4", "row5"]);
    });


    it("should mark the rubric title field as valid when the input is of valid length", () => {
        const titleField: AbstractControl<string, string> | null = component.rubricForm.get("title");
        titleField?.setValue("Valid title");
        expect(titleField?.valid).toBeTrue();
    });

    it("should mark the rubric title field as invalid when the input is 1 character too long", () => {
        const titleField: AbstractControl<string, string> | null = component.rubricForm.get("title");
        titleField?.setValue("This specific title is too long!");
        expect(titleField?.valid).toBeFalse();
    });

    it("should mark the rubric title field as invalid when the input is 1 character too short", () => {
        const titleField: AbstractControl<string, string> | null = component.rubricForm.get("title")!;
        titleField.setValue("T");
        expect(titleField?.valid).toBeFalse();
    });

    it("should mark the column title field as valid when the input is of valid length", () => {
        component.createFormGroupColumnTitles()
        const columnTitleField: AbstractControl<string, string> | null | undefined = component.rubricForm.get("columnTitles")?.get("columnTitle1");
        columnTitleField?.setValue("Valid column title");
        expect(columnTitleField?.valid).toBeTrue();
    });
    
    it("should mark the column title field as invalid when the input is 1 character too long", () => {
        component.createFormGroupColumnTitles()
        const columnTitleField: AbstractControl<string, string> | null | undefined = component.rubricForm.get("columnTitles")?.get("columnTitle1");
        columnTitleField?.setValue("This specific title is too long for a column, it is 128 characters long, which is one longer than it is allowed to be...........");
        expect(columnTitleField?.valid).toBeFalse();
    });


    it("should mark a cell field as valid when the input of valid length", () => {
        const cellsObject: FormGroup = component.createFormGroupCells();
        const cell1Field: AbstractControl<string, string> | null = cellsObject.get("cell1");
        cell1Field?.setValue("Valid cell content");
        expect(cell1Field?.valid).toBeTrue();
    });

    it("should mark a cell field as invalid when the input is 1 character too long", () => {
        const cellsObject: FormGroup = component.createFormGroupCells();
        const cell1Field: AbstractControl<string, string> | null = cellsObject.get("cell1");
        cell1Field?.setValue("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus..");
        expect(cell1Field?.valid).toBeFalse();
    });

});
