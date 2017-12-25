"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ngx_wf_modal_component_1 = require("./ngx-wf-modal.component");
var ngx_wf_modal_component_2 = require("./ngx-wf-modal.component");
exports.NgxWfModalComponent = ngx_wf_modal_component_2.NgxWfModalComponent;
var NgxWfModalModule = (function () {
    function NgxWfModalModule() {
    }
    return NgxWfModalModule;
}());
NgxWfModalModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [ngx_wf_modal_component_1.NgxWfModalComponent],
        providers: [],
        exports: [ngx_wf_modal_component_1.NgxWfModalComponent]
    })
], NgxWfModalModule);
exports.NgxWfModalModule = NgxWfModalModule;
