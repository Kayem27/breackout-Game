export const sounds = {};

sounds.bounce = {
    nativeElement : document.getElementById('bounce'),
    play() {
        this.nativeElement.currentTime = 0; // Remet le curseur à 0
        this.nativeElement.volume = 0.05;
        this.nativeElement.play();
    }
};

sounds.break = {
    nativeElement : document.getElementById('break'),
    play() {
        this.nativeElement.currentTime = 0;
        this.nativeElement.volume = 0.3;
        this.nativeElement.play();
    }
};