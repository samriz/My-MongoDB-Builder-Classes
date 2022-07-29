import * as fs from "fs";

/**
 * @param {string} file
 */
export default function getHTMLContents(file)
{
    //let file = "./mongoui.html";
    var htmlFileContents;
    if(typeof file === "string") fs.readFile(file, (error,data) => {

        htmlFileContents = data.toString().split("\n");
        /* for(let i in htmlFileContents)
        {
            console.log(htmlFileContents[i]);
        } */
    });
    return htmlFileContents;
}

//getHTMLContents();