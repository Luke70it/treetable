class Treetable {

    constructor() {
        this.initializeTreetable(true);

        document.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('treetoggle')) {
                this.handleTreeTableClick(target);
            }
        });
    }
    
    setChildren(container, list, display){
        for (let item of list){
            let kids = container.querySelectorAll("tr[data-pid='"+item.id+"']");
            if (kids.length > 0 && item.classList.contains('expanded')){
                this.setChildren(container, kids, display);
            }
            item.style.display = display;
        }
    }

    handleTreeTableClick(target) {
        const tr = event.target.closest('tr');
        const treetable = target.closest('.treetable');
        const children = tr.parentNode.querySelectorAll(`tr[data-pid="${tr.id}"]`);
        tr.classList.toggle('expanded');
        const isExpanded=tr.classList.contains('expanded');
        if (isExpanded) {
            sessionStorage.setItem(treetable.id+tr.id, isExpanded);
        } else {
            sessionStorage.removeItem(treetable.id+tr.id);
        }
        this.setChildren(tr.parentNode, children, isExpanded ? 'table-row' : 'none');
    }

    initializeTreetable(resetTree=false) {
        const treetables = document.querySelectorAll(".treetable");
        for (let treetable of treetables){
            const rows = Array.from(treetable.tBodies[0].children);
            for (let item of rows) {
                const pid = item.getAttribute('data-pid');
                const existingToggle = item.querySelector('.treetoggle');
                const childRows = document.querySelectorAll(`tr[data-pid="${item.id}"]`);

                if(sessionStorage.getItem(treetable.id+item.id)=='true' || pid=='0') {
                    item.classList.add('expanded');
                }

                if (resetTree && pid && pid !== '0') {
                    item.style.display = 'none';
                }

                if (childRows.length !== 0) {
                    if (!existingToggle) {
                        const toggleElement = document.createElement('span');
                        toggleElement.className = 'treetoggle';
                        item.children[0].insertBefore(toggleElement, item.children[0].firstChild);
                    }
                } else {
                    if (existingToggle) {
                        item.children[0].removeChild(existingToggle);
                    }
                }
            }
            for (let item of rows) {
                const pid = item.getAttribute('data-pid');
                if (pid=="0") {
                    const childRows = document.querySelectorAll(`tr[data-pid="${item.id}"]`);
                    this.setChildren(treetable, childRows, 'table-row');
                }
            }

            // Gestione del drag&drop sulle righe
            var element = treetable.querySelectorAll("tr");
            element.forEach(function(element) {
            var draggableElements = document.querySelectorAll('[draggable="true"]');
                element.draggable = true;
                element.addEventListener('dragstart', function(event) {
                    event.dataTransfer.setData('text/plain', event.target.getAttribute('data-id'));
                });

                element.addEventListener('dragover', function(event) {
                    event.preventDefault();
                });

                element.addEventListener('drop', function(event) {
                    var draggedElementId = event.dataTransfer.getData('text/plain');
                    console.log(draggedElementId, event.target.getAttribute('data-id'));
                    // qui decidiamo se farci qualcosa
                });
            });
        }
    }
}
