import { Component } from "@angular/core";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
	public isHidden: boolean = true;

	/**
	 * Toggles the visibility of the dropdown in the header.
	 * @author Rowen Zaal
	 * @author Bruce Bodaar
	 * @author Jacky Schoen
	 */
	public toggleDropdown(): void {
		this.isHidden = !this.isHidden;
	}
}
