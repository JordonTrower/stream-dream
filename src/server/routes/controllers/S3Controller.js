const fs = require('fs');
require('dotenv').config()

const AWS = require('aws-sdk')

// needed for S3 processing
const { 
	S3_BUCKET_NAME,
	S3_REGION, 
	S3_ACCESS_KEY_ID, 
	S3_SECRET_ACCESS_KEY 
} = process.env

AWS.config.update({
	accessKeyId: S3_ACCESS_KEY_ID,
	secretAccessKey: S3_SECRET_ACCESS_KEY,
	region: S3_REGION
})


export default {
	
	uploadMedia(req, res) {
		fs.readFile(req.file.path, (err, data) => {
			if(err){
				console.log(err)
			}
			const S3 = new AWS.S3()
			const params = {
				Bucket: S3_BUCKET_NAME,
				Key: req.body.name,
				Body: data,
				ACL: 'public-read'
			}
			
			S3.upload(params, (s3err, s3data) => {
				if(s3err){
					console.log(s3err)
					res.status(500).send(s3err);
				}else{
					res.send(s3data)
					// delete the temporary file
					fs.unlink(req.file.path, (fserr) => {
						if (fserr) throw err;
					})
				}
			})
		})
		
	},

	deleteMedia(req, res) {
		const S3 = new AWS.S3()
		const params = {
			Bucket: S3_BUCKET_NAME,
			Key: req.query.s3name
		}
		S3.deleteObject(params, (s3err) => {
			if(s3err){
				console.log(s3err)
				res.status(500).send(s3err);
			}else{
				res.status(200).send('OK')
			}
		})
	}

}
