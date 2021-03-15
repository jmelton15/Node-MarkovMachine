/**** node makeText.js <text file or URL> ****/

const {MarkovMachine} = require('./markov');

const fs = require('mz/fs');
const axios = require('axios').default;
const { htmlToText } = require('html-to-text');
const errorText = "There was an Error: ";

async function cat(path) {
    try {
        let text = await fs.readFile(path,"utf8");
        return text;
    }catch(err) {
        console.log(errorText, err);
    }
}

async function webCat(URL) {
    try {
        let response = await axios.get(URL);
        const html = response.data;
        return htmlToText(html);
    } catch(e) {
        console.log(errorText, e)
    }
}

/** 
 *  run the command with node like follows:
 * 
 * **** node makeText.js <text file or URL> ****
 * 
 * This regular expression can be found on regexr.com/37i6s 
 *  It is a common regex for determining if a string is a url
*/
async function run() {
    if (process.argv[2].match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
        let text = await webCat(process.argv[2]);
        let mm = new MarkovMachine(text);
        console.log(mm.makeText());
    }
    else {
        let text = await cat(process.argv[2]);
        let mm = new MarkovMachine(text);
        console.log(mm.makeText());
    }
}
run();

