import { theme } from "../styles/theme";

export function generateRandomIntegerInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function range(start: number, end: number) {
    var list = [];
    for (var i = start; i <= end; i++) {
        list.push(i);
    }
    return list
}


export const copyToClipBoard = async (copyValue: string) => {

    try {
        await navigator.clipboard.writeText(copyValue);
    } catch (err) {
    }
};


export function FileToData(inputFile: any) {
    if (!!inputFile) {
        const byteArray = fileInputToByteArray(inputFile);
        return {
            name: inputFile.name,
            mediaType: inputFile.type.split("/")[0],
            extension: inputFile.name.split(".").at(-1).toUpperCase(),
            size: inputFile.size,
            file: byteArray,
        };
    }
}

function fileInputToByteArray(element: any) {
    var reader = new FileReader();
    var fileByteArray = [];
    reader.readAsArrayBuffer(element);
    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
            var arrayBuffer = evt.target.result,
                array = new Uint8Array(arrayBuffer);
            for (var i = 0; i < array.length; i++) {
                fileByteArray.push(array[i]);
            }
        }
    };

    return fileByteArray;

}



function byteArrayToBlob(fileByteArray: any) {
    //var byteCharacters = atob(fileByteArray);
    //var byteNumbers = new Array(byteCharacters.length);
    // for (var i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    //var byteArray = new Uint8Array(byteNumbers);
    var byteArray = new Uint8Array(fileByteArray);
    var blob = new Blob([byteArray], { type: "application/octet-stream" });
    return blob;
}

export function browserFileDownloader(file: any, filename: string, extension: string) {
    var blob = byteArrayToBlob(file);
    var url = window.URL.createObjectURL(blob);
    var anchorElem = document.createElement("a");
    anchorElem.style = "display: none";
    anchorElem.href = url;
    anchorElem.download = createFilename(filename, extension);
    document.body.appendChild(anchorElem);
    anchorElem.click();
    document.body.removeChild(anchorElem);
    setTimeout(function () {
        window.URL.revokeObjectURL(url);
    }, 1000);
}



function createFilename(name: string, extension: string) {

    const filename = name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

    return `${filename}.${extension.toLowerCase()}`;
}


export function createDateDayDiffFromNow(days: number) {
    const now = new Date().getTime();

    const dayInMiliSeconds = 1000 * 60 * 60 * 24;

    const diff = now - (dayInMiliSeconds * days)

    return new Date(diff);
}




export function formatDateToDDMMYYYYHhmmss(date: Date) {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function formatDateToDDMMYYYYHhmm(date: Date) {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function formatDateToISODate(date: Date) {
    return date.toISOString().slice(0, 16);
}

export function formatISODateToDate(date: string) {

    return new Date(`${date}:00`)
}

export function parseISODateStringToDate(date: string){
    return new Date(date);
}


export function checkIfValidIP(ip: string) {
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

    return regexExp.test(ip);
}

export function checkIfValidEndpoint(endpoint: string) {
    

    return (endpoint.includes('http://') || endpoint.includes('https://') ) && endpoint.includes(':') && endpoint.includes('brtlvlts');
}


export const overflowStyle = {
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        borderRadius: '24px',
        background: theme.colors.gray[300],
    },
}