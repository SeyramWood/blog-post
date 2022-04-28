import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'

import dbConnection from '../../../libs/dbConnection'
import User from '../../../models/user.model';



export default NextAuth({
    providers:[
        CredentialsProvider({
            name:'Seydel',
            credentials:{
                email:{
                    label:'Email Address',
                    type:'email',
                    placeholder:'youremail@example.com',
                    
                },
                password:{
                    label:'Password',
                    type:'password',
                    placeholder:'Please enter your password',
                    
                }
            },
            authorize: async (credentials) => {
                await dbConnection()
                const {email, password} = credentials;
                let user = await User.findOne({email})

                if (!user) return null
                
                // const check = await bcrypt.compare(password, user.password)
                if (!bcrypt.compareSync(password, user.password)) return null

                return user

            }
            
        })
    ],
    callback:{
        jwt: (token, user) => {
            if (token) {
                id.firstName = user._id
                token.firstName = user.firstName
                token.lastName = user.lastName
            }
            return token
        },
        session: (session, token) => {
            if (session) {
                session.id = token.id
                session.firstName = token.firstName
                session.lastName = token.lastName
            }
            return session
        }
    },
    secret:"88fd4b84db89d4fdc4656",
    jwt:{
        secret:"88fd4b84db89d4fdc4656dffd",
        encrypt:true
    }
})