AFRAME.registerComponent('game', {
    schema: {
        level:{default:1}
    },

    init: function () {
        this.sequence = this.generateSequence();
        this.sequenceVisualizer = document.getElementById('sequence-visualizer');
        this.cursor = document.getElementById('cursor');
        this.sequenceVisualizer.setAttribute('sequence-visualizer', {sequence : this.sequence});
        this.currentRoom = 'altar';
        this.currentRoomSequenceIndex = -1;
        this.roomsContainer = document.getElementById('rooms');
        this.roomcode = '';        
     },

    update: function (oldData) { },

    tick: function (time, timeDelta) { },

    generateSequence: function () {
        let sequence = [];
        for (let i = 0; i < this.data.level + 2; i++) {
            sequence.push(~~(Math.random()*4));
        }               
        console.log(sequence);       
        return sequence;
    },
    navigateTo:function(exitNumber){
       if(exitNumber===this.sequence[this.currentRoomSequenceIndex+1]){
            // - navigate to new room
            // create a new room     
            document.getElementById(`room-${this.roomcode||'altar'}`).setAttribute("visible","false")
            this.currentRoomSequenceIndex++;    
            this.roomcode = this.roomcode+exitNumber;
            const newRoom = document.createElement('a-entity');
            newRoom.id = `room-${this.roomcode}`;
            newRoom.setAttribute('room',{id:this.roomcode});
            newRoom.setAttribute('rotation', {y: 180})
            this.roomsContainer.append(newRoom);
            this.cursor.setAttribute('raycaster',{objects:`#room-${this.roomcode} .exit`})
            this.currentRoom = this.roomcode;
       }else{
           //navigate to death chamber
           console.log('YOU DIED 💀💀💀')
       }
    }

});