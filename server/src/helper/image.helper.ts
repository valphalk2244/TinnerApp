import { fileTypeFromBlob, fileTypeFromBuffer } from 'file-type'

const acceptImageTypes = ['imgage/jpeg', 'image/png', 'image/jpg']

export const ImageHelper = {
    isImage: async function (fileArrayBuffer: ArrayBuffer): Promise<boolean> {
        // const buffer = await file.arrayBuffer()
        const fileTypeResult = await fileTypeFromBuffer(fileArrayBuffer)
        if (fileTypeResult === undefined)
            return false
        return acceptImageTypes.includes(fileTypeResult.mime)
    }
}