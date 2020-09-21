AFRAME.registerComponent('gem', {
   schema: {
       color:{default:'yellow'}
   },
   init: function () {
        this.game = document.querySelector('[game]').components['game'];
        this.el.setAttribute('material',{color:this.data.color});
        this.el.addEventListener('click',()=>{
            this.game.gotGem(this);
        });
    },
   update: function (oldData) { },
   tick: function (time, timeDelta) { },   
});