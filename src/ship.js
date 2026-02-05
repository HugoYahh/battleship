export class Ship{
    constructor(length){
        this.length=length;
        this.numberOfHits=0;
       
    }

    hit(){
        this.numberOfHits+=1;
    }

    isSunk(){
        if(this.numberOfHits>=this.length){
            return true;
        }
        return false;
    }

}

