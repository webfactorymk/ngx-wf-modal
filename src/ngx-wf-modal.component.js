"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NgxWfModalComponent = (function () {
    function NgxWfModalComponent() {
        this.hasCloseButton = true;
        this.closeOnEscape = true;
        this.closeOnOutsideClick = true;
        this.modalSizeClass = "modal-lg";
        this.modalClasses = "";
        this.submitButtonText = "";
        this.cancelButtonText = "";
        this.onModalOpened = new core_1.EventEmitter();
        this.onModalClosed = new core_1.EventEmitter();
        this.onModalSubmit = new core_1.EventEmitter();
        this.onModalCancel = new core_1.EventEmitter();
        this.showModal = false;
    }
    NgxWfModalComponent.prototype.open = function () {
        if (this.showModal) {
            return;
        }
        this.showModal = true;
        this.toggleBodyScroll();
        this.onModalOpened.emit();
    };
    NgxWfModalComponent.prototype.close = function () {
        if (!this.showModal) {
            return;
        }
        this.showModal = false;
        this.toggleBodyScroll();
        this.onModalClosed.emit();
    };
    NgxWfModalComponent.prototype.submit = function () {
        this.onModalSubmit.emit();
        this.close();
    };
    NgxWfModalComponent.prototype.cancel = function () {
        this.onModalCancel.emit();
        this.close();
    };
    NgxWfModalComponent.prototype.initExtras = function (extras) {
        var _this = this;
        extras && Object.getOwnPropertyNames(this).forEach(function (propertyName) {
            if (extras[propertyName]) {
                _this[propertyName] = extras[propertyName];
            }
        });
    };
    NgxWfModalComponent.prototype.outsideClick = function () {
        this.closeOnOutsideClick && this.close();
    };
    NgxWfModalComponent.prototype.escapeClicked = function () {
        this.closeOnEscape && this.close();
    };
    NgxWfModalComponent.prototype.toggleBodyScroll = function () {
        if (this.showModal) {
            document.body.classList.add("modal-open");
        }
        else {
            document.body.classList.remove("modal-open");
        }
    };
    NgxWfModalComponent.prototype.stopModalFromClosing = function (event) {
        event.stopPropagation();
    };
    NgxWfModalComponent.prototype.isModalOpened = function () {
        return this.showModal;
    };
    NgxWfModalComponent.prototype.getCustomClasses = function () {
        return "modal-dialog " + this.modalSizeClass + " " + this.modalClasses;
    };
    return NgxWfModalComponent;
}());
__decorate([
    core_1.Input()
], NgxWfModalComponent.prototype, "hasCloseButton", void 0);
__decorate([
    core_1.Input()
], NgxWfModalComponent.prototype, "closeOnEscape", void 0);
__decorate([
    core_1.Input()
], NgxWfModalComponent.prototype, "closeOnOutsideClick", void 0);
__decorate([
    core_1.Input()
], NgxWfModalComponent.prototype, "modalSizeClass", void 0);
__decorate([
    core_1.Input()
], NgxWfModalComponent.prototype, "modalClasses", void 0);
__decorate([
    core_1.Input()
], NgxWfModalComponent.prototype, "submitButtonText", void 0);
__decorate([
    core_1.Input()
], NgxWfModalComponent.prototype, "cancelButtonText", void 0);
__decorate([
    core_1.Output()
], NgxWfModalComponent.prototype, "onModalOpened", void 0);
__decorate([
    core_1.Output()
], NgxWfModalComponent.prototype, "onModalClosed", void 0);
__decorate([
    core_1.Output()
], NgxWfModalComponent.prototype, "onModalSubmit", void 0);
__decorate([
    core_1.Output()
], NgxWfModalComponent.prototype, "onModalCancel", void 0);
__decorate([
    core_1.ViewChild("modal")
], NgxWfModalComponent.prototype, "modal", void 0);
NgxWfModalComponent = __decorate([
    core_1.Component({
        selector: "ngx-wf-modal",
        template: "\n        <div #modal *ngIf=\"showModal\" class=\"modal custom_modal fade\"\n             [class.in]=\"showModal\"\n             [ngStyle]=\"{ display: showModal ? 'block' : 'none' }\"\n             (keydown.esc)=\"escapeClicked()\" (click)=\"outsideClick()\"\n             tabindex=\"-1\" role=\"dialog\">\n            <div tabindex=\"0\" [class]=\"getCustomClasses()\" (click)=\"stopModalFromClosing()\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button *ngIf=\"hasCloseButton\" type=\"button\" class=\"close\" data-dismiss=\"modal\"\n                                [attr.aria-label]=\"cancelButtonText || 'Close'\" (click)=\"cancel()\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                        \n                        <ng-content select=\"modal-header\"></ng-content>\n                    </div>\n\n                    <div class=\"modal-body\">\n                        <ng-content select=\"modal-body\"></ng-content>\n                    </div>\n\n                    <div class=\"modal-footer\">\n                        <ng-content select=\"modal-footer\"></ng-content>\n                        <button *ngIf=\"cancelButtonText\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\"\n                                (click)=\"cancel()\">{{ cancelButtonText }}\n                        </button>\n                        <button *ngIf=\"submitButtonText\" type=\"button\" class=\"btn btn-primary\"\n                                (click)=\"submit()\">{{ submitButtonText }}\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
        styles: ["\n        .modal {\n            position: fixed;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            left: 0;\n            z-index: 1050;\n            overflow: hidden;\n            -webkit-overflow-scrolling: touch;\n            outline: 0;\n            width: 100%;\n            height: 100%;\n        }\n\n        .fade {\n            opacity: 0;\n            -webkit-transition: opacity .15s linear;\n            -o-transition: opacity .15s linear;\n            transition: opacity .15s linear;\n        }\n\n        .fade.in {\n            opacity: 1;\n        }\n\n        .modal-dialog {\n            position: relative;\n            width: auto;\n            margin: 10px;\n        }\n\n        .modal.in .modal-dialog {\n            -webkit-transform: translate(0, 0);\n            -ms-transform: translate(0, 0);\n            -o-transform: translate(0, 0);\n            transform: translate(0, 0);\n        }\n\n        .modal.fade .modal-dialog {\n            -webkit-transition: -webkit-transform .3s ease-out;\n            -o-transition: -o-transform .3s ease-out;\n            transition: transform .3s ease-out;\n            -webkit-transform: translate(0, -25%);\n            -ms-transform: translate(0, -25%);\n            -o-transform: translate(0, -25%);\n            transform: translate(0, -25%);\n        }\n\n        @media (min-width: 768px) {\n            .modal-dialog {\n                width: 600px;\n                margin: 30px auto;\n            }\n        }"
        ]
    })
], NgxWfModalComponent);
exports.NgxWfModalComponent = NgxWfModalComponent;
