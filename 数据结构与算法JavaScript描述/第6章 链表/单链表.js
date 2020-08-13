function Node(element) {
    this.element = element;
    this.next = null;
}

function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.findPrevious = findPrevious;
    this.remove = remove;
}

LList.prototype = {
    remove: function (item) {
        var prevNode = this.findPrevious(item);
        if (prevNode.next != null) {
            prevNode.next = prevNode.next.next
        }

    },

    findPrevious: function (item) {
        var currentNode = this.head;
        while (!(currentNode == null) && currentNode.element !== item) {
            currentNode = currentNode.next;
        }
        return currentNode;
    },

    display: function () {
        var currentNode = this.head;
        while (currentNode != null) {
            console.log(currentNode.element);
            currentNode = currentNode.next;
        }
    },

    find: function (item) {
        var currentNode = this.head;
        while (currentNode.element != item) {
            currentNode = currentNode.next;
        }
        return currentNode;
    },

    insert:function(newElement,item){
        var newNode = new Node(newElement);
        var current = this.find(item);
        newElement.next = current.next;
        current.next = newNode;
    }
}