'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const File = use('App/Models/File')
const Helpers = use('Helpers')
/**
 * Resourceful controller for interacting with files
 */
class FileController {

  async store ({ request, response }) {
    try {
      if(!request.file('file')){
        return
      }

      const upload = request.file('file', {size: '5mb'})

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if(!upload.moved()){
        throw upload.error()
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: {message: 'Erro no upload de arquivo!'} })
    }
  }

  // async destroy ({ params, request, response }) {
  // }
}

module.exports = FileController
