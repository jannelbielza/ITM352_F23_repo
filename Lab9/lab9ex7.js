function download(url, callback) {
    setTimeout(() => {
        // Simulate downloading the picture
        console.log(`Downloading ${url} ...`);
        const picture_data = "image data: XOXOXO";
        callback(picture_data); // Call the callback with the downloaded data
    }, 3 * 1000);
}

function process(picture) {
    console.log(`Processing ${picture}`);
}

let url = 'https://www.example.com/big_pic.jpg';
download(url, process); // Pass the process function as the callback