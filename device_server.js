const server = require('fastify')();
var cmd=require('node-cmd');


let version = {
    name: "version"
};

let board_list = {
    name: "board_list"
};

let compile = {
    name: "compile"
}

let upload = {
    name: "upload"

};

let operations = [version, board_list, compile, upload];

server.get('/operations/:name', function (req, res) {
    
    let result = operations.find(element => element.name === req.params.name);
    if(result == null){
        return {"error":"operation not found"};
    }else {
        
        if(result.name == 'version'){
            /*
            cmd.run(
                `arduino-cli version`,
                function(err, data, stderr){
                    console.log(data)
                }
            );
            */
           const sync = cmd.runSync('arduino-cli version');
           console.log(sync.data);
           return sync;
        }

        let tmp_msg;
        if(result.name == 'board_list'){
            /*
            cmd.run(
                `arduino-cli board list`,
                function(err, data, stderr){
                    tmp_msg = data;
                    console.log(data)
                    //cannot return here
                }
            );
            */
            const sync = cmd.runSync('arduino-cli board list');
            console.log(sync.data);
            return sync;
        }

        if(result.name == 'compile'){
            /*
            cmd.run(
                `arduino-cli compile --fqbn arduino:avr:unowifi MyFirstSketch`,
                function(err, data, stderr){
                    console.log(data)
                }
            );
            */
            const sync = cmd.runSync('arduino-cli compile --fqbn arduino:avr:unowifi MyFirstSketch');
            console.log(sync.data);
            return sync;
        }

        if(result.name == 'upload'){
            cmd.run(
                `arduino-cli upload -p /dev/cu.usbmodem11401 --fqbn arduino:avr:unowifi MyFirstSketch`,
                function(err, data, stderr){
                    console.log(data)
                }
            );
        }
    };
});

server.listen(3000, "127.0.0.1");