AFRAME.registerComponent('altar', {
   schema: {},
   init: function () {  
        this.game = document.querySelector('[game]').components['game'];    
        this.el.addEventListener('click',()=>{
            this.game.placeGem();
        }); 
   }   
});