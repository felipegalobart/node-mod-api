import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Phrase } from "../models/Phrase";

export const ping = (req: Request, res: Response) => {
  res.json({pong: true});
}

export const random = (req: Request, res: Response) => {
  let nRand: number = Math.floor( Math.random() * 1000);
  res.json({number: nRand});
}

export const nome = (req: Request, res: Response) => {
  let nome: string = req.params.nome;
  res.json({nome});
}

export const createPhrase = async (req: Request, res: Response) => {

  let author: string = req.body.author;
  let txt: string = req.body.txt;
  let newPhrase = await Phrase.create({
    author,
    txt
  })
  res.status(201);
  res.json({ id: newPhrase.id, author, txt });
}

export const listPhrase = async (req: Request, res: Response) => {
  let list = await Phrase.findAll();
  res.json({ list });
}

export const getPhrase = async (req: Request, res: Response) => {
  let phrase = await Phrase.findByPk(req.params.id);
  
  if (phrase) {
    res.json({ phrase });
  } else {
    res.json({Erro: 'Não foi encontrado a frase com esse ID'})
  }
}

export const updatePhrase = async (req: Request, res: Response) => {
  let phrase = await Phrase.findByPk(req.params.id);
  let { author, txt } = req.body;

  if (phrase) {
    phrase.author = author;
    phrase.txt = txt;
    await phrase.save();

    res.json({ phrase })
  } else {
    res.json({Erro: 'Frase não encontrada'});
  }
}

export const deletePhrase = async (req: Request, res: Response) => {
  let { id } = req.params;
  await Phrase.destroy({ where: {id} });
  res.json({});
}

export const randomPhrase = async (req: Request, res: Response) => {
  let phrase = await Phrase.findOne({
    order: [
      Sequelize.fn('RANDOM')
    ]
  });

  res.json({phrase});
}

export const uploadFile = async (req: Request, res: Response) => {

  console.log('FILE', req.file);
  console.log('FILES', req.files);
  

  res.json({});
}