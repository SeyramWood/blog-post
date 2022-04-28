import bcrypt from 'bcrypt';


import User from '../../../models/user.model';
import dbConnection from '../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()

    const {method, body} = req;


    if (method === 'POST') {
        let user = await User.findOne({email:body.email})
        if (user) {
            res.status(400).json({msg:'Email already in use.'})
        }
        const hashedPassword = await bcrypt.hash(body.password, 12)

        user = await User.create({...body, password:hashedPassword})

        res.status(200).json(user)
    }else{
        res.status(405).json({error:'Method not allowed.'})
    }
    
}