const readline = require('readline');

const fs = require("fs");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('enc/dec ', (mode) => {
    rl.question('key ', (key) => {
        rl.question('Enter the text: ', (text) => {
            rl.question('shift/unicode ', (shiftOrUnicode) => {
                if (mode === "enc" && shiftOrUnicode === "unicode") {
                    encryptionUnicode(text, key);
                } else if (mode === "dec" && shiftOrUnicode === "unicode") {
                    decryptionUnicode(text, key);
                } else if (mode === "enc" && shiftOrUnicode === "shift") {
                    encryptionShift(text, key);
                } else if (mode === "dec" && shiftOrUnicode === "shift") {
                    decryptionShift(text,key);
                }
                rl.question('In or out? ', (inOrOut) => {
                    if (inOrOut === "in") {
                        rl.question('Which file to read? ', (whichFile) => {
                            fs.readFile(whichFile, function (err, data) {
                                if (mode === "enc" && shiftOrUnicode === "shift") {
                                    console.log(encryptionShift(data.toString(), key));
                                } else if (mode === "dec" && shiftOrUnicode === "shift") {
                                    console.log(decryptionShift(data.toString(), key));
                                } else if (mode === "enc" && shiftOrUnicode === "unicode") {
                                    console.log(encryptionUnicode(data.toString(), key));
                                } else if (mode === "dec" && shiftOrUnicode === "unicode") {
                                    console.log(decryptionUnicode(data.toString(), key));
                                }
                            });
                        });

                    } else if ("out") {
                        rl.question('What file name? ', (whichFile) => {

                            fs.writeFile(whichFile, text, err => {
                                if (err === null) {
                                    console.log('saved correctly!');
                                } else {
                                    console.log('ERROR!', err);
                                }
                            });
                        });
                    }
                });

            });
            function encryptionShift(userInputText, userInputNumber) {
                let textFromInput = userInputText.split('');
                for (let i = 0; i < textFromInput.length; i++) {
                    switch (textFromInput[i]) {
                        case ' ':
                            break;
                        case 'a':
                            textFromInput[i] = 'z';
                            break;
                        case 'z':
                            textFromInput[i] = 'a';
                            break;
                        default:
                            textFromInput[i] = String.fromCharCode(parseInt(userInputNumber) + textFromInput[i].charCodeAt(0))
                    }
                }
                return textFromInput.join('');
            }

            function decryptionShift(userInputText, userInputNumber) {
                let textFromInput = userInputText.split('');
                for (let i = 0; i < textFromInput.length; i++) {
                    switch (textFromInput[i]) {
                        case ' ':
                            break;
                        case 'a':
                            textFromInput[i] = 'z';
                            break;
                        case 'z':
                            textFromInput[i] = 'a';
                            break;
                        default:
                            textFromInput[i] = String.fromCharCode(textFromInput[i].charCodeAt(0) - parseInt(userInputNumber))
                    }
                }
                return textFromInput.join("");
            }
            function encryptionUnicode(userInputText, userInputNumber) {
                let textFromInput = userInputText.split('');
                for (let i = 0; i < textFromInput.length; i++) {

                    textFromInput[i] = String.fromCharCode(parseInt(userInputNumber) + textFromInput[i].charCodeAt(0))
                }
                return textFromInput.join('');
            }
            function decryptionUnicode(userInputText, userInputNumber) {
                let textFromInput = userInputText.split('');
                for (let i = 0; i < textFromInput.length; i++) {

                    textFromInput[i] = String.fromCharCode(textFromInput[i].charCodeAt(0) - parseInt(userInputNumber))
                }
                return textFromInput.join("");
            }
        });
    });
});