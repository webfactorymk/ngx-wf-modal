import {
    AfterContentInit,
    Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer, Renderer2,
    ViewChild
} from "@angular/core";

@Component({
    selector: "ngx-wf-modal",
    template: `
        <div #modal *ngIf="showModal" id="ngx-wf-modal" class="modal custom_modal fade"
             [class.in]="showModal"
             [ngStyle]="{ display: showModal ? 'block' : 'none' }"
             (keydown.esc)="escapeClicked()" tabindex="-1" role="dialog">
            <div tabindex="0" [class]="getCustomClasses()" #modalWrapper>
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

        .modal:focus, .modal *:focus {
            outline: 0 !important;
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
    @ViewChild("modalWrapper") modalWrapper: ElementRef;

    showModal: boolean = false;

    clickListener: Function;

    constructor(private _elementRef: ElementRef, private _renderer: Renderer) {
    }

    open() {
        if (this.showModal) {
            return;
        }

        this.showModal = true;
        this.toggleBodyScroll();
        this.onModalOpened.emit();

        setTimeout(() => {
            this.clickListener = this._renderer.listenGlobal("document", "click",
                (event: any) => {
                    let clickedInsideModal = false;
                    let eventPath = event.path ||
                        (event.composedPath && event.composedPath()) ||
                        this.getElementPath(event.target);

                    for (let path of eventPath) {
                        if (path == this.modalWrapper.nativeElement) {
                            clickedInsideModal = true;
                            break;
                        }
                    }

                    if (!clickedInsideModal) {
                        this.outsideClick();
                    }
                });
        }, 1)
    }

    close() {
        if (!this.showModal) {
            return;
        }

        this.showModal = false;
        this.toggleBodyScroll();
        this.onModalClosed.emit();
        this.clickListener();
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

    stopModalFromClosing(event: Event) {
        // event && event.stopPropagation();
    }

    isModalOpened() {
        return this.showModal;
    }

    getCustomClasses() {
        return `modal-dialog ${this.modalSizeClass} ${this.modalClasses}`;
    }

    private getElementPath(element) {
        const path = [];
        let currentElem = element;
        while (currentElem) {
            path.push(currentElem);
            currentElem = currentElem.parentElement;
        }

        if (path.indexOf(window) === -1 && path.indexOf(document) === -1) {
            path.push(document);
        }

        if (path.indexOf(window) === -1) {
            path.push(window);
        }

        return path;
    }
}