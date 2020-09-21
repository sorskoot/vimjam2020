AFRAME.registerComponent('game', {
    schema: {
        level: { default: 1 }
    },

    init: function () {
        this.sequence = this.generateSequence();
        this.sequenceVisualizer = document.getElementById('sequence-visualizer');
        this.cursor = document.getElementById('cursor');
        this.sequenceVisualizer.setAttribute('sequence-visualizer', { sequence: this.sequence });
        this.currentRoom = 'altar';
        this.currentRoomSequenceIndex = -1;
        this.roomsContainer = document.getElementById('rooms');
        this.roomcode = '';

        this.currentGem = undefined;
    },

    update: function (oldData) { },

    tick: function (time, timeDelta) { },

    generateSequence: function () {
        let sequence = [];
        for (let i = 0; i < this.data.level + 2; i++) {
            sequence.push(~~(Math.random() * 4));
        }
        console.log(sequence);
        return sequence;
    },
    navigateTo: function (exitNumber) {
        if(this.currentGem){
            if(exitNumber === this.sequence[this.currentRoomSequenceIndex - 1]){
                
                let currentroom = document.getElementById(`room-${this.roomcode}`);
                currentroom.remove()
                this.currentRoomSequenceIndex--;
                this.roomcode = this.roomcode.slice(0,this.currentRoomSequenceIndex) ||'altar';                
                console.log(`💎:${this.roomcode}`);
                document.getElementById(`room-${this.roomcode || 'altar'}`).setAttribute("visible", "true");
                this.cursor.setAttribute('raycaster', { objects: `#room-${this.roomcode} .exit, .gem, .altar` })
            }
            else{
                this.youDied();
            }                       
        }
        else if (exitNumber === this.sequence[this.currentRoomSequenceIndex + 1]) {
            // - navigate to new room
            // create a new room     
            document.getElementById(`room-${this.roomcode || 'altar'}`).setAttribute("visible", "false")
            this.currentRoomSequenceIndex++;
            this.roomcode = this.roomcode + exitNumber;
            const newRoom = document.createElement('a-entity');
            newRoom.id = `room-${this.roomcode}`;
            let isGemRoom = false;

            if( this.currentRoomSequenceIndex === this.sequence.length-1){
                isGemRoom=true;    
            }

            newRoom.setAttribute('room', { id: this.roomcode, gemroom:isGemRoom });
            newRoom.setAttribute('rotation', { y: 180 })
            this.roomsContainer.append(newRoom);
            this.cursor.setAttribute('raycaster', { objects: `#room-${this.roomcode} .exit, .gem` })
            this.currentRoom = this.roomcode;
        } else {
            //navigate to death chamber
            this.youDied();
        }
    },
    gotGem:function(gem){
        this.currentRoomSequenceIndex =  this.sequence.length-1;
        this.currentGem = gem;
        gem.el.remove();
    },
    placeGem:function(){
        console.log('You got a 💎');
        this.score++;
        this.currentGem = undefined;
        this.data.level ++;
        this.reset();
    },
    reset:function(){
        this.roomsContainer.innerHtml = '';
        this.currentRoomSequenceIndex = -1;
        this.sequence = this.generateSequence();
        this.sequenceVisualizer.setAttribute('sequence-visualizer', { sequence: this.sequence });
    },
    youDied:function() {
        console.log('YOU DIED 💀💀💀');
    }
});


