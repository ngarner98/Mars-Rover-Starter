class Rover {
   // Write code here!
   constructor(position) {
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      this.position = position;
   };

   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
      };

      for(let i=0; i < message.commands.length; i++) {   //For every command in message.command
         if(message.commands[i].commandType === "MOVE" && this.mode !== "LOW_POWER") { //If its the MOVE command and we have power to move
            this.position = message.commands[i].value; //Current position gets updated by the move command
            let result = { 
               completed: true //Creates result object and adds completed to it
               };
            response.results.push(result);
         }
         else if(message.commands[i].commandType === "STATUS_CHECK") { //if its the STATUS_CHECK command
            //Creates result object and pushes completed and roverStatus to it
            let result = {    
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            };
            response.results.push(result);
         }
         else if(message.commands[i].commandType === "MODE_CHANGE") {  //if its the MODE_CHANGE command
            this.mode = message.commands[i].value; //Current mode is updated by mode change
            let result = {
               completed: true //Creates result object and pushes completed to it
            };
            response.results.push(result);
         }
         else {  //If rover is in low power mode the command will fail
            let result = {
               completed: false
            };
            response.results.push(result);
         }
      } 
      return response;
   }
};

module.exports = Rover;