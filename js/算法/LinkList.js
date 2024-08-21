class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}
class LinkList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    append(val) {
        const node = new Node(val);
        let cur = this.head
        if (cur === null) {
            this.head = node
        } else {
            while (cur.next) {
                cur = cur.next;
            }
            cur.next = node
        }
        this.length++;
    }
    print() {
        const stack = [];
        let cur = this.head;
        while (cur) {
            stack.push(cur.val)
            cur = cur.next;
        }
        return stack.join('->')
    }
    removeByVal(val) {
        let cur = this.head;
        while (cur.next) {
            if (cur.next.val === val) {
                let del = cur.next;
                cur.next = cur.next.next;
                del = null;
                this.length--
            } else {
                cur = cur.next
            }
        }
    }
    removeByAt(index) {
        let i = 0;
        let cur = this.head;
        if (index === 0) {
            this.head = null
        } else {
            while (i < index) {
                cur = cur.next;
                i++
            }
            let del = cur.next;
            cur.next = cur.next.next;
            del = null;
        }
        this.length--
    }
}