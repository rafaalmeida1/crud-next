import Client from '../../../models/Client';
import { dbConnection } from '../../../services/dbConnection';

dbConnection();

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const clients = await Client.find({});
                res.setHeader('Content-Type', 'application/json');
                // res.setHeader('Cache-Control', 'max-age=180000')
                res.status(200).json({ sucess: true, data: clients })
            } catch (err) {
                console.log(err)
                res.status(500).json({ sucess: false, err })
            }
            break;

        case "POST":
            try {
                const { name, email } = req.body
                if (!name, !email) throw "invalid data"
                const client = await Client.create({name, email})
                res.setHeader('Content-Type', 'application/json');
                // res.setHeader('Cache-Control', 'max-age=180000')
                res.status(201).json({ sucess: true, data: client })                
            } catch (err) {
                console.log(err)
                res.status(500).json({ sucess: false, err })
            }
            break;
    }
}