import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxWfModalComponent} from "./ngx-wf-modal.component";
import {NgxWfModalHeaderComponent} from "./ngx-wf-modal-header.component";
import {NgxWfModalBodyComponent} from "./ngx-wf-modal-body.component";
import {NgxWfModalFooterComponent} from "./ngx-wf-modal-footer.component";

export {NgxWfModalComponent} from "./ngx-wf-modal.component";
export {NgxWfModalHeaderComponent} from "./ngx-wf-modal-header.component";
export {NgxWfModalBodyComponent} from "./ngx-wf-modal-body.component";
export {NgxWfModalFooterComponent} from "./ngx-wf-modal-footer.component";

@NgModule({
    imports: [CommonModule],
    declarations: [NgxWfModalComponent, NgxWfModalHeaderComponent, NgxWfModalBodyComponent, NgxWfModalFooterComponent],
    providers: [],
    exports: [NgxWfModalComponent, NgxWfModalHeaderComponent, NgxWfModalBodyComponent, NgxWfModalFooterComponent]
})
export class NgxWfModalModule {

}