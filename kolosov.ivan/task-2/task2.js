function reverseWords(str) {
    let words = str.split(' ');
    let resultStr = words[0].split('').reverse().join('');
    words.shift();
    for (let word of words) {
        resultStr += ' ' + word.split('').reverse().join('');
    }
    console.log(resultStr);
}

reverseWords("Hello world");
reverseWords("What is happening with AI bubble at the moment");
reverseWords("Is there any solutions for model collapsing problem");