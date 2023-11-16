class Tab { 
	constructor() { 
		this.head = this.tail = this.current = null; 
		this.navigate("Google.com"); 
	}
	deleteAll(p) {
		if (p == null) { 
			return;
		}
		else { 
			this.deleteAll(p.next); 
			p = null; 
		}
	}
	navigate(link) {
		let p = new Page(link);
		if (this.head == null) { 
			this.head = p; 
			this.tail = p; 
			this.current = p; 
			return;
		}
		if (this.current == this.tail) { 
			this.tail.next = p;
			p.pre = this.tail;
			this.tail = p;
			this.current = this.tail;
			return;
		}
		else { 
			this.deleteAll(this.current.next); 
			p.pre = this.current;
			this.tail = p;  
			this.current.next = p; 
			this.current = p; 
			return;
		}
	}
	backPage() { 
		if (this.current == this.head) { 
			return false; 
		}
		else { 
			this.current = this.current.pre; 
			return true; 
		}
	}
	nextPage() { 
		if (this.current == this.tail) { 
			return false; 
		}
		else { 
			this.current = this.current.next; 
			return true; 
		}
	}
}


