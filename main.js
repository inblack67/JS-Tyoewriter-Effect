class TypeWriter{

    constructor(words, wait=3000, textElement){
        this.words = words;
        this.wait = wait;
        this.textElement = textElement;
        this.wordIndex = 0;
        this.text = '';
        this.type()
        this.isDeleting = false;
    }

    type(){
        const current = this.wordIndex % this.words.length;
        const fullText = this.words[current];

        if(this.isDeleting){
            this.text = fullText.substring(0, this.text.length - 1)
        }

        else{
            this.text = fullText.substring(0, this.text.length + 1)
        }

        this.textElement.innerHTML = `<span class="border">${this.text}</span>`;

        let typingSpeed = 300;

        if(this.isDeleting){
            typingSpeed /= 2;

        }
        if(!this.isDeleting && this.text === fullText){
            typingSpeed = this.wait;
            this.isDeleting = true;
        }

        else if (this.isDeleting && this.text === ''){
            this.isDeleting = false;
            this.wordIndex++;
        }

        setTimeout(() => {
            this.type();
        }, typingSpeed);
    }

}


document.addEventListener('DOMContentLoaded', init);

function init(){

    const element = document.querySelector('.text-type');
    const words = JSON.parse(element.getAttribute('data-words'));
    const wait = parseInt(element.getAttribute('data-wait'), 10);

    new TypeWriter(words, wait, element)
}