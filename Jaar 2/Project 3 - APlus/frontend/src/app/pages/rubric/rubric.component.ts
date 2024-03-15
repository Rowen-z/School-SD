import { Component } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";

@Component({
    selector: "app-rubric",
    templateUrl: "./rubric.component.html",
    styleUrls: ["./rubric.component.css"],
})
export class RubricComponent {
    public years = [1, 2];
    public rubricForm: FormGroup;

    /**
     * Creates a new instance of this class
     * @param formBuilder The FormBuilder instance which simplifies the building of the form
     * @author Anne Butter
     */
    public constructor(private formBuilder: FormBuilder) {
        this.rubricForm = this.formBuilder.group({
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(31),
            ]),
            year: new FormControl(1, Validators.required),
        });
        this.createFormGroupColumnTitles();
        this.createFormGroupRows();
    }

    /**
     * Puts all keys from the columnTitles object in an array to make them iterable
     * @return The array with the keys
     * @author Anne Butter
     */
    public get getColumnTitleKeys(): string[] {
        const columnTitleKeys: string[] = [];
        const controls: FormGroup = this.rubricForm.get(
            "columnTitles"
        ) as FormGroup;
        Object.keys(controls.value).forEach((key) => {
            columnTitleKeys.push(key);
        });
        return columnTitleKeys;
    }

    /**
     * Puts all keys from the tableRows object in an array to make them iterable
     * @return The array with the keys
     * @author Anne Butter
     */
    public get getRowKeys(): string[] {
        const rowKeys: string[] = [];
        const controls: FormGroup = this.rubricForm.get(
            "tableRows"
        ) as FormGroup;
        Object.keys(controls.value).forEach((key) => {
            rowKeys.push(key);
        });
        return rowKeys;
    }

    /**
     * Creates 3 default "columnTitle" controls in an object and adds it to the main FormGroup
     * @author Anne Butter
     */
    public createFormGroupColumnTitles(): void {
        let columnTitleObject: Object = {};
        for (let i: number = 0; i < 3; i++) {
            Object.assign(columnTitleObject, {
                ["columnTitle" + i]: [null, [Validators.maxLength(127)]],
            });
        }
        this.rubricForm.addControl(
            "columnTitles",
            this.formBuilder.group(columnTitleObject)
        );
    }

    /**
     * Creates 5 default "row" controls in an object and adds it to the main FormGroup
     * @author Anne Butter
     */
    public createFormGroupRows(): void {
        let rowObject: Object = {};
        for (let i: number = 1; i < 6; i++) {
            Object.assign(rowObject, {
                ["row" + i]: this.createFormGroupCells(),
            });
        }
        this.rubricForm.addControl(
            "tableRows",
            this.formBuilder.group(rowObject)
        );
    }

    /**
     * Creates 3 default "cell" controls in an object and returns it as a FormGroup
     * @returns The 3 new controls in a FormGroup
     * @author Anne Butter
     */
    public createFormGroupCells(): FormGroup {
        let cellsObject: Object = {};
        for (let i: number = 0; i < 3; i++) {
            Object.assign(cellsObject, {
                ["cell" + i]: [null, [Validators.maxLength(511)]],
            });
        }
        return this.formBuilder.group(cellsObject);
    }

    public onSubmit(): void {
        //To be implemented in issue #11
    }
}
