import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[FileDragNDropDirective]',
})
export class FileDragNDropDirective {
    @HostListener('drop', ['$event']) 
    onDrop(event: any): void {
        let items = event.dataTransfer.items;
        console.log(event, event.dataTransfer, event.dataTransfer.files, event.dataTransfer.items)
        this.processDroppedContent(items)
    }
    
    @HostListener('dragover', ['$event']) 
    onDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
    }

    @HostListener('dragleave', ['$event']) 
    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
    }

    processDroppedContent(items: any) {
    }
}
