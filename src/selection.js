export class SelectionJS {
    constructor(element, settings = {}) {
        this.element = element;
        this.selection = null;
        this.settings = settings;
        
        this.data = {
            text: null,
            html: null
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.element.addEventListener('mouseup', () => {
            this.selection = window.getSelection();
            
            if (this.selection.type === 'Range') {
                this.processSelection();
                
                this.onSelectionCallback();
            }
            
        });
    }
    
    onSelectionCallback() {
        if (typeof this.settings.onSelection !== 'function') {
            return false;
        }
        
        this.settings.onSelection.call(this, this.data);
    }
    
    processSelection() {
        this.data.text = this.selection.toString();
        
        var range = this.selection.getRangeAt(0);
        var clonedSelection = range.cloneContents();
        var div = document.createElement('div');
        div.appendChild(clonedSelection);
        
        console.log(range);
    }
    
    
}