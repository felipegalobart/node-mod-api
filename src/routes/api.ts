import { Router } from "express";
import multer from "multer";

import * as ApiController from '../controllers/apiController';

const storageConfig = multer.diskStorage({
  destination(req, file, callback) {
      callback(null, './tmp')
  },
  filename(req, file, callback) {
      let randomName = Math.floor(Math.random()* 9999999);
      callback(null, `${randomName+Date.now()}.png`)
  },
});

const upload = multer({
  storage: storageConfig,
  fileFilter(req, file, callback) {
      const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']
      if (allowed.includes( file.mimetype )) {
        callback(null, true);
      } else {
        callback(null, false);
      }
  },
  //limits: { fileSize: 1000000} //descomentar para limitar o tamanho do arquivo. (em bytes)
});

const router = Router();

router.get("/ping", ApiController.ping);
router.get('/random', ApiController.random);
router.get('/nome/:nome', ApiController.nome);

router.post('/frases', ApiController.createPhrase);
router.get('/frases', ApiController.listPhrase);
router.get('/frase/aleatoria', ApiController.randomPhrase);
router.get('/frase/:id', ApiController.getPhrase);
router.put('/frase/:id', ApiController.updatePhrase);
router.delete('/frase/:id', ApiController.deletePhrase);

router.post('/upload', upload.single('avatar'), ApiController.uploadFile);

export default router;