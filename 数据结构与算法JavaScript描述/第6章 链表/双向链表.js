function Node(element) {
    this.element = element;
    this.previous = null;
    this.next = null;
}

function LList() {
    this.head = head;
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.remove = remove;
    this.findLast = findLast;
    this.disReverse = disReverse;
}

LList.prototype = {
    disReverse: function () {
        var currentNode = this.head;
        currentNode = this.findLast();
        while (!(currentNode.previous == null)) {
            console.log(currentNode.element);
            currentNode = currentNode.previous;
        }
    },

    findLast: function () {
        var currentNode = this.head;
        while (!(currentNode.next == null)) {
            currentNode = currentNode.next;
        }
        return currentNode;
    },

    remove: function (item) {
        var currentNode = this.find(item);
        if(!(currentNode.next == null)){
            currentNode.previous.next = currentNode.next;
            currentNode.next.previous = currentNode.previous;
            currentNode.next = null;
            currentNode.previous = null;
        }
    },

    display:function(){
        var currentNode = this.head;
        while (currentNode != null) {
            console.log(currentNode.element);
            currentNode = currentNode.next;
        }
    },

    find:function(item){
        var currentNode = this.head;
        while(currentNode.element != item){
            currentNode = currentNode.next;
        }
        return currentNode;
    },

    insert:function(newElement,item){
        var newNode = new Node(newElement);
        var current = this.find(item);
        newNode.next = current.next;
        newNode.previous = current;
        current.next = newNode;
    }
}