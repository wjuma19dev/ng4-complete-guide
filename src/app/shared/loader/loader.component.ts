import { Component } from "@angular/core";


@Component({
    selector: 'app-loader',
    template: `
        <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `,
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent {}