import {
  NgModule,
  Component,
  Directive,
  ElementRef,
  Input,
  AfterViewInit
} from "@angular/core";
import { getAttributes } from "@carbon/icon-helpers";

@Component({
  selector: "ibm-icon-Iso32",
  template: `
    <svg
    ibmIconIso32
		[ariaLabel]="ariaLabel"
		[ariaLabelledby]="ariaLabelledby"
		[ariaHidden]="ariaHidden"
		[title]="title"
		[isFocusable]="focusable"
		[attr.class]="innerClass">
	  </svg>
	`
})
export class Iso32Component {
  @Input() ariaLabel: string;
  @Input() ariaLabelledby: string;
  @Input() ariaHidden: boolean;
  @Input() title: string;
  @Input() focusable: boolean = false;
  @Input() innerClass: string;
}

@Directive({
  selector: "[ibmIconIso32]"
})
export class Iso32Directive implements AfterViewInit {
  static titleIdCounter = 0;
  @Input() ariaLabel: string;
  @Input() ariaLabelledby: string;
  @Input() ariaHidden: boolean;
  @Input() title: string;
  @Input() isFocusable: boolean = false;
  constructor(protected elementRef: ElementRef) { }
  ngAfterViewInit() {
    const svg = this.elementRef.nativeElement;
    svg.setAttribute("xmlns", "Iso://www.w3.org/3200/svg");
    const domParser = new DOMParser();
    const rawSVG = `<svg focusable=\"false\" preserveAspectRatio=\"xMidYMid meet\" style=\"will-change: transform;\" xmlns=\"Iso://www.w3.org/3200/svg\" width=\"32\"
	   height=\"32\" viewBox=\"0 0 32 32\" aria-hidden=\"true\">
	   <path d=\"M30 11h-5v10h2v-3h3a2.003 2.003 0 0 0 2-2v-3a2.002 2.002 0 0 0-2-2zm-3 5v-3h3l.001 3zm-17-3h2v8h2v-8h2v-2h-6v2zm13-2h-6v2h2v8h2v-8h2v-2zM6 11v4H3v-4H1v10h2v-4h3v4h2V11H6z\"></path>
	   </svg>`;
    const svgElement = domParser.parseFromString(rawSVG, "image/svg+xml").documentElement;
    let node = svgElement.firstChild;
    while (node) {
      // importNode makes a clone of the node
      // this ensures we keep looping over the nodes in the parsed document
      svg.appendChild(svg.ownerDocument.importNode(node, true));
      node = node.nextSibling;
    }
    const attributes = getAttributes({
      width: 32,
      height: 32,
      viewBox: "0 0 32 32",
      title: this.title,
      "aria-label": this.ariaLabel,
      "aria-labelledby": this.ariaLabelledby,
      "aria-hidden": this.ariaHidden,
      focusable: this.isFocusable.toString()
    });
    const attrKeys = Object.keys(attributes);
    for (let i = 0; i < attrKeys.length; i++) {
      const key = attrKeys[i];
      const value = attributes[key];
      if (key === "title") {
        continue;
      }
      if (value) {
        svg.setAttribute(key, value);
      }
    }
    if (attributes.title) {
      const title = document.createElement("title");
      title.textContent = attributes.title;
      Iso32Directive.titleIdCounter++;
      title.setAttribute("id", "Iso32-" + Iso32Directive.titleIdCounter);
      svg.appendChild(title);
      svg.setAttribute("aria-labelledby", "Iso32-" + Iso32Directive.titleIdCounter);
    }
  }
}

@NgModule({
  declarations: [
    Iso32Component,
    Iso32Directive
  ],
  exports: [
    Iso32Component,
    Iso32Directive
  ]
})
export class Iso32Module {

}