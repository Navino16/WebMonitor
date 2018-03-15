const util = require('util');
const exec = util.promisify(require('child_process').exec);

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index.ejs');
})
.use(function(req, res){
  res.redirect('/');
});

async function exec_cmd(cmd) {
  await exec(cmd).then(((state) => {
    console.log(state.stdout);
    return state.stdout;
  })).catch((error) => {
    console.log('stderr:', error);
  });;
}

app.listen(3000);
