//*nix
 
    var cmd=require('node-cmd');
 
//*nix supports multiline commands
    
    //touch ./example/example.created.file');
 
    cmd.run(
        `arduino-cli version
        arduino-cli board list
        arduino-cli core list`,
        function(err, data, stderr){
            console.log(data)
        }
    );
