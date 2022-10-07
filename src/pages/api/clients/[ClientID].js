import Client from '../../../models/Client';
import { dbConnection } from '../../../services/dbConnection';

dbConnection();

export default async function handler(req, res) {
    const { method } = req;
    const { ClientID } = req.query;

    switch (method) {
        case "PUT":
            try {
                const { name, email } = req.body
                if (!name, !email) throw "invalid data"
                await Client.updateOne({ _id: ClientID }, { name, email })
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'max-age=180000')
                res.status(200).json({ sucess: true })
            } catch (err) {
                console.log(err)
                res.status(500).json({ sucess: false, err })
            }
            break;

        case "DELETE":
            try {
                await Client.deleteOne({_id:ClientID})
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'max-age=180000')
                res.status(201).json({ sucess: true})
            } catch (err) {
                console.log(err)
                res.status(500).json({ sucess: false, err })
            }
            break;
    }
}