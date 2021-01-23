class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed = 0;

      this.image = loadImage("Milk.png");

    }

    getFoodStock(){
      return this.foodStock;
    }

    setFoodStock(foodStock){
      this.foodStock = foodStock;
    }
  
    getLastFed(){
      var option;
      if(this.lastFed<12)
        return this.LastFed + " A.M. "
      else
        return (this.lastFed%12) + " P.M. "
    }
    
    setLastFed(lastFedTime){
      this.lastFed = lastFedTime;
    }
      deductFood(){
        if(this.foodStock>0){
          this.foodStock = this.foodStock-1;
        }
      }

      addFoodStock(){
        this.foodStock = this.foodStock+1;
      }

    display(){
      var x = 80, y = 100;
      imageMode(CENTER);
      image(this.image,720,220,70,70);


      if(this.foodStock!=0){
        for(var i = 0; i<this.foodStock; i++){  
          if(i%10===0){
            x = 80;
            y = y+50;
          }
          image(this.image,x, y, 50, 50);
          x = x+30;

        }


      }
      
    }

    bedroom(){
      imageMode(CENTER);
      image(bedroomImg,250,250, 500, 500);
    }

    garden(){
      imageMode(CENTER);
      image(gardenImg,250,250, 500,500);
    }

    washroom(){
      imageMode(CENTER);
      image(washroomImg,250,250, 500,500);
    }

    livingroom(){
      imageMode(CENTER);
      image(livingroomImg,250,250, 500,500);
    }

};