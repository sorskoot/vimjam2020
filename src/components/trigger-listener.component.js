AFRAME.registerComponent('trigger-listener', {   
    init: function () {
        var el = this.el;
       
        el.addEventListener('buttondown', function (evt) { 
            const cursor = document.getElementById('cursor');
            const raycaster = cursor.components['raycaster'];
            if(raycaster.intersectedEls.length > 0){
                this.game = document.querySelector('[game]').components['game'];
                const data = raycaster.intersectedEls[0].components['room-exit'].data
                this.game.navigateTo(data);
            }
        });
    },
});
