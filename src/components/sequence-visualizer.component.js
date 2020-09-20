import {colors} from './../definition/colors';

AFRAME.registerComponent('sequence-visualizer', {
    schema: {
        sequence: {
            type:'array'
        },
        delay:{
            default:1000
        }
    },
    init: function () { },
    update: function (oldData) {     
        this.sequenceIndex = 0;    
        this.delayCountdown = this.data.delay;
        this.updateColor();
    },
    tick: function (time, timeDelta) {
        this.delayCountdown -= timeDelta;
        if(this.delayCountdown < 100){
            this.updateColor(false);
        }
        if(this.delayCountdown <= 0 &&  this.sequenceIndex < this.data.sequence.length ){
            this.sequenceIndex ++; 
            this.updateColor();
            this.delayCountdown = this.data.delay;
        }
    },
    updateColor:function(enabled = true) {

        let color; 
        if(enabled){
        color = colors[this.data.sequence[this.sequenceIndex]];
        }else
        {
            color="#111"
        }

        this.el.setAttribute("material", { color: color });
    }
});


