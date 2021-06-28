var express = require('express');
var server = express();
var cmd=require('node-cmd');
var fs = require('file-system');
var multer = require('multer');
//var upload = multer({ dest: 'upload/'});


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

           const sync = cmd.runSync('arduino-cli version');
           console.log(sync.data);
           return sync;
        }

        let tmp_msg;
        if(result.name == 'board_list'){

            const sync = cmd.runSync('arduino-cli board list');
            console.log(sync.data);
            return sync;
        }

        if(result.name == 'compile'){

            const sync = cmd.runSync('arduino-cli compile --fqbn arduino:avr:unowifi Sketch');
            console.log(sync.data);
            return sync;
        }

        if(result.name == 'upload'){
            cmd.run(
                `arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:unowifi Sketch`,
                function(err, data, stderr){
                    console.log(data)
                }
            );
        }
    };
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, 'MySketch.ino')
    }
})
   
var upload_file = multer({ storage: storage })

server.post('/upload_file', upload_file.single('sketch'), function(req, res, next){
    res.send("<h2>Sketch Uploaded Successfully!</h2>");
});

server.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});
/*
server.listen(3000, () => {
    console.log("Server running on port 3000");
});
*/
server.listen(9090, () => {
    console.log("Server running on port 9090");
});