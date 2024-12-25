import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import config from '../../config'

const s3 = new S3Client({
  forcePathStyle: false,
  region: config.aws.region as string,
  credentials: {
    accessKeyId: config.aws.accessKey as string,
    secretAccessKey: config.aws.secretKey as string
  }
})

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.aws.bucketName as string,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })
})

const deleteFileFromS3 = async (key: string) => {
  try {
    const deleteParams = {
      Bucket: config.aws.bucketName as string,
      Key: key
    }
    const command = new DeleteObjectCommand(deleteParams)
    const response = await s3.send(command)
    return response
  } catch (err) {
    console.error('Error', err)
  }
}

export { deleteFileFromS3, uploadS3 }
