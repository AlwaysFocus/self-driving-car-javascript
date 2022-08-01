class Controls {
    constructor(type) {
        this.forward = false;
        this.reverse = false;
        this.left = false;
        this.right = false;
        switch (type) {
            case "KEYS":
                // Listen for keyboard input events - the # denotes this method is private
                this.#addKeyboardListeners();
                break;
            case "DUMMY":
                // Dummy controls - no input
                this.forward = true;
                break;
        }

    }

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
            //   console.table(this);
        };

        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
            //   console.table(this);
        };
    }
}
