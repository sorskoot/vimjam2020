const { colors } = require("../definition/colors");

AFRAME.registerComponent('room-exit', {
    schema: { default: 0 },
    init:function(){
        this.game = document.querySelector('[game]').components['game'];
        this.el.addEventListener('click',()=>{
            this.game.navigateTo(this.data);
        });
    },
    update: function (oldData) { 
        this.updateColor();
    },
    updateColor:function() {
        const color = colors[this.data];        
        this.el.setAttribute("material", { color: color });
    }
});