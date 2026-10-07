import fs from"fs/promises"
const dBpath = "/home/waheed/PostmanCLI-using-Axios/data.json"

async function readContent(){

    try {
        let userData= await fs.readFile(dBpath, "utf-8")
        return JSON.parse(userData)
    } catch (error) {
        console.error(error)
    }

}

async function writeContent(content) {
    try {
        await fs.writeFile(dBpath,JSON.stringify(content, null, 2)) 
    } catch (error) {
        console.error(error)
    }
}

export {readContent, writeContent}