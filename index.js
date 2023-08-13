const admin = require('firebase-admin')

function parseUnit(params) {
    switch (params.unit) {
        case 'd':
            return params.value * 24 * 60 * 60 * 1000; // Convert days to milliseconds
        case 'h':
            return params.value * 60 * 60 * 1000; // Convert hours to milliseconds
        case 'm':
            return params.value * 60 * 1000; // Convert minutes to milliseconds
        case 's':
            return params.value * 1000; // Convert seconds to milliseconds
        case 'w':
            return params.value * 7 * 24 * 60 * 60 * 1000; // Convert weeks to milliseconds
        case 'M':
            return params.value * 30 * 24 * 60 * 60 * 1000; // Approximate months to milliseconds (30 days)
        case 'y':
            return params.value * 365 * 24 * 60 * 60 * 1000; // Approximate years to milliseconds (365 days)
        default:
            return null;
    }
}

// let uploadparams = {
//     bucketRef: '',
//     filePath: '',
//     filename: '',
//     destinationPath: ''
// }

async function uploadToStorage(params) {
    try {
        await params.bucketRef.upload(params.filePath, {
            destination: `${params.destinationPath}/${params.filename}`,
        })
        return { message: 'uploaded successfully', status: true }
    } catch (error) {
        return { message: 'upload failed', status: false }

    }
}

// let downloadparams = {
//     bucketRef: '',
//     filePath: '',
//     unit: '',
//     value: ''
// }
async function getDownloadUrl(params) {
    const file = params.bucketRef.file(params.filePath);
    let res = parseUnit(params)
    let expires = Date.now() + res
    try {
        const [url] = await file.getSignedUrl({
            action: 'read',
            version: 'v2',
            expires: res != null ? expires : '01-01-2900'
        });
        return url
    } catch (error) {
        return { message: 'Unable to  download', status: false }
    }
}

// let delparams = {
//     bucketRef: '',
//     filePath: '',
// }

async function deleteFileFromStorage(params) {
    const file = params.bucketRef.file(params.filePath);
    try {
        await file.delete()
        return { message: 'File deleted successfully', status: true }
    } catch (error) {
        return { message: error, status: true }

    }
}


module.exports = {
    uploadToStorage: uploadToStorage,
    getDownloadUrl: getDownloadUrl,
    deleteFileFromStorage: deleteFileFromStorage
}

