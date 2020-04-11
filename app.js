const TypeWriter = function(textElement, words, wait = 3000){

    this.textElement = textElement;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.text = '';
    this.wordIndex = 0;
    this.type();
    this.isDeleting = false;

}

TypeWriter.prototype.type = function() {
    const currentIndex = this.wordIndex % this.words.length;
    const fullText = this.words[currentIndex];
    if(this.isDeleting){
        this.text = fullText.substring(0, this.text.length - 1);
    }
    else{
        this.text = fullText.substring(0, this.text.length + 1);
    }
    this.textElement.innerHTML = `<span class="border">${this.text}</span>`;

    let typingSpeed= 300;

    if(this.isDeleting){
        typingSpeed /= 2;
    }

    if(!this.isDeleting && this.text === fullText){
        typingSpeed = this.wait;
        this.isDeleting = true;
    }

    else if(this.isDeleting && this.text === ''){
        this.isDeleting = false;
        this.wordIndex++;
        typingSpeed = 500;
    }

    setTimeout(() => {
        this.type();
    }, typingSpeed);
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', init)

function init(){
    const element = document.querySelector('.text-type');
    const words = JSON.parse(element.getAttribute('data-words'));
    const wait = element.getAttribute('data-wait')

    new TypeWriter(element, words, wait)
}

