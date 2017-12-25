import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";

@Component({
    selector: "ngx-wf-modal",
    template: `
        <div #modal *ngIf="showModal" class="modal custom_modal fade"
             [class.in]="showModal"
             [ngStyle]="{ display: showModal ? 'block' : 'none' }"
             (keydown.esc)="escapeClicked()" (click)="outsideClick()"
             tabindex="-1" role="dialog">
            <div tabindex="0" [class]="getCustomClasses()" (click)="stopModalFromClosing()">
                <div *ngIf="showModal" class="modal-content">
                    <div class="modal-header">
                        <button *ngIf="hasCloseButton" type="button" class="close" data-dismiss="modal"
                                [attr.aria-label]="cancelButtonText || 'Close'" (click)="cancel()">
                            <span aria-hidden="true">&times;</span>
                        </button>

                        <ng-content select="ngx-wf-modal-header"></ng-content>
                    </div>

                    <div class="modal-body">
                        <ng-content select="ngx-wf-modal-body"></ng-content>
                    </div>

                    <div class="modal-footer">
                        <ng-content select="ngx-wf-modal-footer"></ng-content>
                        <button *ngIf="cancelButtonText" type="button" class="btn btn-default" data-dismiss="modal"
                                (click)="cancel()">{{ cancelButtonText }}
                        </button>
                        <button *ngIf="submitButtonText" type="button" class="btn btn-primary"
                                (click)="submit()">{{ submitButtonText }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1050;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            outline: 0;
            width: 100%;
            height: 100%;
        }

        .fade {
            opacity: 0;
            -webkit-transition: opacity .15s linear;
            -o-transition: opacity .15s linear;
            transition: opacity .15s linear;
        }

        .fade.in {
            opacity: 1;
        }

        .modal-dialog {
            position: relative;
            margin: 30px auto;
        }

        .modal.fade .modal-dialog {
            -webkit-transition: -webkit-transform .3s ease-out;
            -o-transition: -o-transform .3s ease-out;
            transition: transform .3s ease-out;
            -webkit-transform: translate(0, -25%);
            -ms-transform: translate(0, -25%);
            -o-transform: translate(0, -25%);
            transform: translate(0, -25%);
        }

        .modal.in .modal-dialog {
            -webkit-transform: translate(0, 0);
            -ms-transform: translate(0, 0);
            -o-transform: translate(0, 0);
            transform: translate(0, 0);
        }`
    ]
})
export class NgxWfModalComponent {
    @Input() hasCloseButton: boolean = true;
    @Input() closeOnEscape: boolean = true;
    @Input() closeOnOutsideClick: boolean = true;

    @Input() modalSizeClass: string = "modal-lg";
    @Input() modalClasses: string = "";

    @Input() submitButtonText: string = "";
    @Input() cancelButtonText: string = "";

    @Output() onModalOpened = new EventEmitter<any>();
    @Output() onModalClosed = new EventEmitter<any>();

    @Output() onModalSubmit = new EventEmitter<any>();
    @Output() onModalCancel = new EventEmitter<any>();

    @ViewChild("modal") modal: ElementRef;

    showModal: boolean = false;

    open() {
        if (this.showModal) {
            return;
        }

        this.showModal = true;
        this.toggleBodyScroll();
        this.onModalOpened.emit();
    }

    close() {
        if (!this.showModal) {
            return;
        }

        this.showModal = false;
        this.toggleBodyScroll();
        this.onModalClosed.emit();
    }

    submit() {
        this.onModalSubmit.emit();
        this.close();
    }

    cancel() {
        this.onModalCancel.emit();
        this.close();
    }

    initExtras(extras?: any) {
        extras && Object.getOwnPropertyNames(this).forEach((propertyName) => {
            if (extras[propertyName]) {
                this[propertyName] = extras[propertyName];
            }
        });
    }


    outsideClick() {
        this.closeOnOutsideClick && this.close();
    }

    escapeClicked() {
        this.closeOnEscape && this.close();
    }

    toggleBodyScroll() {
        if (this.showModal) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }

    stopModalFromClosing(event: MouseEvent) {
        event && event.stopPropagation();
    }

    isModalOpened() {
        return this.showModal;
    }

    getCustomClasses() {
        return `modal-dialog ${this.modalSizeClass} ${this.modalClasses}`;
    }
}