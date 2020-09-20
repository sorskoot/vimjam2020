AFRAME.registerComponent('room', {
   schema: {
       id:{type:'string'}
   },
   init: function () {  
       this.el.innerHTML = 
       `<a-plane material="color: #333" geometry="height: 10; width: 10" rotation="-90 0 0"></a-plane> \
        <a-box class="exit" room-exit="0" position="0 1.25 -5" scale="2 2.5 0.2"></a-box> \
        <a-box class="exit" room-exit="1" position="5 1.25 0" scale="2 2.5 0.2" rotation="0 270 0"></a-box> \ 
        <a-box class="exit" room-exit="2" position="0 1.25 5" scale="2 2.5 0.2" rotation="0 180 0"></a-box> \
        <a-box class="exit" room-exit="3" position="-5 1.25 0" scale="2 2.5 0.2" rotation="0 90 0"></a-box>`;
   },  
});