import { fileTypeFromBuffer } from 'file-type'

const acceptFileTypes = ['image/jpeg', 'image/png']

export const ImageHelper = {
    isImage: async function (fileArrayBuffer: ArrayBuffer): Promise<boolean> { // Check if file is an image
        // const buffer = await file.arrayBuffer()
        const fileTypeResult = await fileTypeFromBuffer(fileArrayBuffer) // Get file type from buffer
        if (fileTypeResult === undefined) {
            return false
        }
        return acceptFileTypes.includes(fileTypeResult.mime) // Check if file type is in the accepted file types
    }
}