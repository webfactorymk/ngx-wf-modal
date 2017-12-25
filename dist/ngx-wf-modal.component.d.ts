import { ElementRef, EventEmitter } from "@angular/core";
export declare class NgxWfModalComponent {
    hasCloseButton: boolean;
    closeOnEscape: boolean;
    closeOnOutsideClick: boolean;
    modalSizeClass: string;
    modalClasses: string;
    submitButtonText: string;
    cancelButtonText: string;
    onModalOpened: EventEmitter<any>;
    onModalClosed: EventEmitter<any>;
    onModalSubmit: EventEmitter<any>;
    onModalCancel: EventEmitter<any>;
    modal: ElementRef;
    showModal: boolean;
    open(): void;
    close(): void;
    submit(): void;
    cancel(): void;
    initExtras(extras?: any): void;
    outsideClick(): void;
    escapeClicked(): void;
    toggleBodyScroll(): void;
    stopModalFromClosing(event: MouseEvent): void;
    isModalOpened(): boolean;
    getCustomClasses(): string;
}
