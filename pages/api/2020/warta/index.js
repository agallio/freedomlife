import moment from 'moment';

import { getDatabase } from 'db';

export default async (req, res) => {
  const database = await getDatabase();
  const { WartaModel } = database;

  if (req.method === 'POST') {
    const { month, year, month_data } = req.body;

    WartaModel.findOne({ month, year })
      .then(warta => {
        if (warta) {
          res.status(422).json({
            message: 'Warta Existed'
          });
        } else {
          const wartaData = {
            month,
            year,
            month_data
          };
          const newWarta = new WartaModel(wartaData);
          newWarta.save().then(() => {
            console.log({
              message: 'Warta Created',
              data: wartaData
            });
            res.status(201).json({
              message: 'Warta Created',
              data: wartaData
            });
          });
        }
      })
      .catch(err => {
        console.log({
          message: 'Create Warta Failure',
          error: err
        });
        res.status(500).json({
          message: 'Create Warta Failure',
          error: err
        });
      });
  } else if (req.method === 'PUT') {
    res.status(200).json({
      message: 'Warta Updated'
    });
  } else if (req.method === 'GET') {
    const { month, year } = req.query;

    if (month !== undefined || year !== undefined) {
      WartaModel.findOne({ month, year })
        .then(warta => {
          if (warta) {
            res.json(warta);
          } else {
            res.status(404).json({
              message: 'Warta Not Found'
            });
          }
        })
        .catch(err =>
          res.status(500).json({
            message: 'Fetch Warta Failure',
            error: err
          })
        );
    } else {
      WartaModel.find()
        .then(warta => res.json(warta))
        .catch(err =>
          res.status(500).json({
            message: 'Fetch Warta Failure',
            error: err
          })
        );
    }
  } else {
    res.status(404).json({
      message: 'Not Found'
    });
  }
};