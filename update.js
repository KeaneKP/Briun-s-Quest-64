let playerObject = 0;
const update = () => {
    playerObject = objects.find( object => {return object.player})
    objects = objects.filter( object =>  !object.dead );
    objects.forEach(object => {
        object.update();
    });

    // moves the player to the front of the array so it is drawn on top
    playerObject = objects.splice(objects.indexOf(playerObject), 1)[0];
    objects.push(playerObject);
    playerObject = objects[objects.length - 1];
    cameraCoords.x = playerObject.x - 26;
    cameraCoords.y = playerObject.y - 26;

    //Generates chunks around the player
    // I know I could have done this better shut up
    getChunk({x: playerObject.x, y: playerObject.y});
    getChunk({x: playerObject.x+50, y: playerObject.y});
    getChunk({x: playerObject.x-50, y: playerObject.y});
    getChunk({x: playerObject.x, y: playerObject.y+50});
    getChunk({x: playerObject.x, y: playerObject.y-50});
    getChunk({x: playerObject.x+50, y: playerObject.y+50});
    getChunk({x: playerObject.x+50, y: playerObject.y-50});
    getChunk({x: playerObject.x-50, y: playerObject.y+50});
    getChunk({x: playerObject.x-50, y: playerObject.y-50});
    getChunk({x: playerObject.x+100, y: playerObject.y});
    getChunk({x: playerObject.x-100, y: playerObject.y});
    getChunk({x: playerObject.x, y: playerObject.y+100});
    getChunk({x: playerObject.x, y: playerObject.y-100});
    getChunk({x: playerObject.x+100, y: playerObject.y+100});
    getChunk({x: playerObject.x+100, y: playerObject.y-100});
    getChunk({x: playerObject.x-100, y: playerObject.y+100});
    getChunk({x: playerObject.x-100, y: playerObject.y-100});

}