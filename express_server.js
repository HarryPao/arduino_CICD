var express = require('express');
var server = express();
var cmd=require('node-cmd');
var fs = require('file-system');
var multer = require('multer');
var upload = multer({ dest: 'upload/'});


let version = {
    name: "version"
};

let board_list = {
    name: "board_list"
};

let compile = {
    name: "compile"
}

let upload_sketch = {
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


server.post('/upload', upload.single('logo'), function(req, res, next){
    res.send({ret_code: '0'});
});

server.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

server.listen(3000, "127.0.0.1");