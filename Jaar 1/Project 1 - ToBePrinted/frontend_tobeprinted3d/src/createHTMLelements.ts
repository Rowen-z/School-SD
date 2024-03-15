export class CreateHTMLelements {
    /**
     * A function to create section elements
     * @author Anish Raghoenath <anish.raghoenath@hva.nl>
     * @param elementId the id of the element that has to be created
     * @param parentElement the element that will be the parent of the created element
     * @returns the created section element
     */
    public static createSectionElement(
        elementId: string,
        parentElement: HTMLElement
    ): HTMLElement {
        const element = document.createElement("section");
        element.setAttribute("id", elementId);
        parentElement.appendChild(element);
        return element;
    }

    public static createSectionElementWithClass(
        elementClass: string,
        parentElement: HTMLElement
    ): HTMLElement {
        const element = document.createElement("section");
        element.setAttribute("class", elementClass);
        parentElement.appendChild(element);
        return element;
    }
    
    /**
     * A function to create anchor elements
     * @author Anish Raghoenath <anish.raghoenath@hva.nl>
     * @param elementId the id of the element that has to be created
     * @param parentElement the element that will be the parent of the created element
     * @param hrefPath the path to the hypertext refrence of the anchor element
     * @returns the created anchor element
     */
    public static createAnchorElement(
        elementId: string,
        parentElement: HTMLElement,
        hrefPath: string
    ): HTMLAnchorElement {
        const aElement = document.createElement("a");
        aElement.setAttribute("id", elementId);
        aElement.setAttribute("href", hrefPath);
        parentElement.appendChild(aElement);
        return aElement;
    }

    /**
     * A function to create image elements
     * @author Anish Raghoenath <anish.raghoenath@hva.nl>
     * @param sourcePath the path to the source of the image
     * @param parentElement the element that will be the parent of the created element
     * @returns the created image element
     */
    public static createImageElement(
        sourcePath: string,
        parentElement: HTMLElement
    ): HTMLImageElement {
        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", sourcePath);
        parentElement.appendChild(imgElement);
        return imgElement;
    }

    /**
     * A function to create button elements
     * @author Anish Raghoenath <anish.raghoenath@hva.nl>
     * @param elementId the id of the element that has to be created
     * @param parentElement the element that will be the parent of the created element
     * @param buttonText the text that will be placed inside of a button
     * @returns the created button element
     */
    public static createButtonElement(
        elementId: string,
        parentElement: HTMLElement,
        buttonText: string
    ): HTMLButtonElement {
        const buttonElement = document.createElement("button");
        buttonElement.setAttribute("id", elementId);
        buttonElement.textContent = buttonText;
        parentElement.appendChild(buttonElement);
        return buttonElement;
    }

    /**
     * A function to create input elements
     * @author Rowen Zaal
     * @param elementId the id of the input element that's being created
     * @param parentElement the element that's going to be the parent of the input element
     * @returns the created input element
     */
    public static createInputElement(
        elementId: string,
        parentElement: HTMLElement
    ): HTMLInputElement {
        const inputElement = document.createElement("input");
        inputElement.setAttribute("id", elementId);
        parentElement.appendChild(inputElement);
        return inputElement;
    }

    /**
     * A function to create label elements
     * @author Rowen Zaal
     * @param parentElement the element that's going to be the parent of the input element
     * @param labelText this is the text that will be placed in the label element
     * @returns the created label element
     */
    public static createLabelElement(
        parentElement: HTMLElement,
        labelText: string
    ): HTMLLabelElement {
        const labelElement = document.createElement("label");
        labelElement.innerText = labelText;
        parentElement.appendChild(labelElement);
        return labelElement;
    }

    /**
     * A function to create a section with input for edit account details
     * @author Rowen Zaal
     * @param parentElement the element that's going to be the parent of the input element
     * @param sectionId will be the id of the section element
     * @param labelText is the text that will be placed in the label element
     * @param accountDetails is the type of Accountdetails
     * @returns the created label element
     */
    public static createSectionAccount(
        parentElement: HTMLElement,
        sectionId: string,
        labelText: string,
        accountDetails?: string | number
    ): HTMLElement {
        const section = CreateHTMLelements.createSectionElement(sectionId, parentElement);
        CreateHTMLelements.createLabelElement(section, labelText);
        const input = CreateHTMLelements.createInputElement(sectionId, section);
        if(accountDetails) {
            input.value = accountDetails.toString();
        }
        return section;
    }
}