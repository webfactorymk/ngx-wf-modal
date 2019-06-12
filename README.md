# ngx-wf-modal

A Modal Dialog Module that can receive dynamic content.
Compatible with bootstrap 3

# Install

1. Install npm module:

```bash
    npm install ngx-wf-modal --save
```

2. If you are using system.js you may want to add this into `map` and `package` config:

```json
    {
        "map": {
            "ngx-wf-modal": "node_modules/ngx-wf-modal"
        },
        "packages": {
            "ngx-wf-modal": { "main": "index.js", "defaultExtension": "js" }
        }
    }
```

Add the module to your project

```typescript
@NgModule({
    imports: [
        NgxWfModalModule
    ]
    ...
)}
```

In the html file, you can insert the modal component

```html
<ngx-wf-modal #modalDialog [hasCloseButton]="hasCloseButton" [closeOnEscape]="closeOnEscape"
[closeOnOutsideClick]="closeOnOutsideClick" [modalSizeClass]="'modal-lg'"
(onModalSubmit)="onModalSubmitted()", (onModalCancel)="onModalCancelled()", (onModalClosed)="modalClosed()">
    <ngx-wf-modal-header>
        <div *ngIf="title">{{title}}</div>
    </ngx-wf-modal-header>

    <ngx-wf-modal-body>
       <div class="alert alert-danger" *ngIf="message">{{message}}</div>
    </ngx-wf-modal-body>

    <ngx-wf-modal-footer>
       <button class="btn" (click)="modalDialog.close()">OK</div>
    </ngx-wf-modal-footer>
</ngx-wf-modal>
```

```typescript
    @Input() hasCloseButton: boolean = true;
    @Input() closeOnEscape: boolean = true;
    @Input() closeOnOutsideClick: boolean = true;

    @Input() modalSizeClass: string = "modal-lg";
    @Input() modalClasses: string = "";

    @Input() submitButtonText: string = "";
    @Input() cancelButtonText: string = "";
```

# Inputs
### hasCloseButton: boolean (default: true)
Specifies if the top X button for closing the dialog should be shown

### closeOnEscape: boolean (default: true)
Specifies if the modal should be closed when escape is clicked

### closeOnOutsideClick: boolean (default: true)
Specifies if the modal should be closed on outside mouse clicks

### modalSizeClass: string (default: "modal-lg")
The class for the modal size (lg, md, sm)

### modalClasses: string (default: "")
Additional classes that should be added to the modal-dialog div tag

### submitButtonText: string (default: "")
The text for the submit button. If not specified, the submit button will not be shown

### cancelButtonText: string (default: "")
The text for the cancel button. If not specified, the cancel button will not be shown


# Outputs
```typescript
    @Output() onModalOpened = new EventEmitter<any>();
    @Output() onModalClosed = new EventEmitter<any>();

    @Output() onModalSubmit = new EventEmitter<any>();
    @Output() onModalCancel = new EventEmitter<any>();
```