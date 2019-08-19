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
  selector: "ibm-icon-http20",
  template: `
    <svg
    ibmIconHttp20
		[ariaLabel]="ariaLabel"
		[ariaLabelledby]="ariaLabelledby"
		[ariaHidden]="ariaHidden"
		[title]="title"
		[isFocusable]="focusable"
		[attr.class]="innerClass">
	  </svg>
	`
})
export class Http20Component {
  @Input() ariaLabel: string;
  @Input() ariaLabelledby: string;
  @Input() ariaHidden: boolean;
  @Input() title: string;
  @Input() focusable: boolean = false;
  @Input() innerClass: string;
}

@Directive({
  selector: "[ibmIconHttp20]"
})
export class Http20Directive implements AfterViewInit {
  static titleIdCounter = 0;
  @Input() ariaLabel: string;
  @Input() ariaLabelledby: string;
  @Input() ariaHidden: boolean;
  @Input() title: string;
  @Input() isFocusable: boolean = false;
  constructor(protected elementRef: ElementRef) { }
  ngAfterViewInit() {
    const svg = this.elementRef.nativeElement;
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const domParser = new DOMParser();
    const rawSVG = `<svg focusable=\"false\" preserveAspectRatio=\"xMidYMid meet\" style=\"will-change: transform;\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\"
	   height=\"20\" viewBox=\"0 0 32 32\" aria-hidden=\"true\">
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
      width: 20,
      height: 20,
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
      Http20Directive.titleIdCounter++;
      title.setAttribute("id", "http20-" + Http20Directive.titleIdCounter);
      svg.appendChild(title);
      svg.setAttribute("aria-labelledby", "http20-" + Http20Directive.titleIdCounter);
    }
  }
}

@NgModule({
  declarations: [
    Http20Component,
    Http20Directive
  ],
  exports: [
    Http20Component,
    Http20Directive
  ]
})
export class Http20Module {

}