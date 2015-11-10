var fs = require('fs');
var path = require('path');
var request = require('request');

module.exports = {
  pwd: function(file) {
    var output = process.stdout.write(process.cwd());
    done(output);
  },

  date: function(file) {
    var date = new Date();
    var output = process.stdout.write(date.toString());
  },
  
  ls: function(file) {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      var output = "";
      files.forEach(function(file) {
        output += process.stdout.write(file.toString() + '\n');
      });
    });
  },
  echo: function(file) {
    console.log(file);
  },
//  catSync: function(file) {
//    //use fs to output file content:
//    fs.readFile(file, function(err, data){
//      if(!err){
//        console.log(data.toString());
//      }
//      process.stdout.write('\nprompt > ');
//    });
//  },
  
  
  cat: function(file) {
    //use fs to output file content:
    readTextFile(file, function(data){
      done(data);   
    });
  }, 
  
  
  head: function(file){
    //output first 5 lines from file
    var output = "";
    readTextFile(file, function(data){
      var lines = data.toString().split("\n");
      for(var i = 0; i < 5; i++){
        output += lines[i]+"\n";
      }
      done(output);
    });  
  },
  tail: function(file) {
    //output last 5 lines of file
    readTextFile(file, function(data){
      var output = "";
      var lines = data.toString().trim().split("\n");
      for(var i = lines.length-5; i < lines.length; i++){
        output += lines[i] + "\n";
      }
      done(output);
    });
  },
  sort: function(file) {
    readTextFile(file, function(data){
      var output = "";
      var lines = data.toString().trim().split("\n");
      lines = lines.sort();
      for(var i = 0; i < lines.length; i++) {
        output += lines[i] + "\n";
      }
      done(output);
    });
  },
  
  wc: function(file) {
    readTextFile(file, function(data){
      done(data.toString().trim().split('\n').length);
    });
  },
  uniq: function(file) {
    readTextFile(file, function(data){
      var output = "";
      var lines = data.toString().trim().split("\n");
      
      for(var i = 0; i <lines.length; i++) {
        if(lines[i] !== lines[i-1]) {
          output += lines[i] + "\n";
        }
      }
      done(output);
    });
  },
  
  curl: function(url) {
    request(url, function(err, resp, body){
      if(!err && resp.statusCode == 200) {
        done(body);
      }
    });
  },
  
  find: function(dir) {
    findAll(dir);
  }
};

function readTextFile(file, func) {
  
  fs.readFile(file, function(err, data){
      if(!err){
        return func(data.toString());
      }
  });
}

function done(output) {
  console.log(output);
  process.stdout.write('\nprompt > ');
}

//function findFiles(dir) {
//  var result = [];
//  fs.readdir(dir, function(err, files) {
//    if (err) {
//      console.error(err);
//      return;
//    }
//    result.push(dir);  
//    
//    var pending = files.length;
//    
//    files.forEach(function(file) {
//      pending--;
//      file = path.resolve(dir, file);
//      fs.stat(file, function(err, stats) {
//        if (err) throw err;
//        if (!stats.isDirectory()) result.push(file);
//        if (stats.isDirectory()) findFiles(file); 
//        if (!pending) console.log(result);
//      });
//    });
//  });
//}



function findAll(dir) {
  var contents = [],
      count = 0;
  
  function findInDir(dir) {
    contents.push(dir);

    fs.readdir(dir, function(err, files) {
      count += files.length;
      files.forEach(function(file) {
        file = path.resolve(dir, file );
        fs.stat(file, function(err, stats) {
          if (stats.isDirectory()) {
            findInDir(file);
            //count--;
          } else {
            contents.push(file);
            count--;
          }

          if (!count) console.log('done');
        });
      });
    });
  }
  
  findInDir(dir);
}