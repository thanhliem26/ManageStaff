'use strict'
// const shopModal = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const tokenService = require('./token.service');
const { createTokenPair, verifyJWT } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response');
import { findById } from './user.service';
import db from '../models';

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {

    static handleRefreshToken = async (refreshToken) => {
        const foundToken = await tokenService.findByRefreshTokenUsed(refreshToken);

        if(foundToken) {
            //decode user nào đang sử dụng lại refresh token
            const { user_id, email } = await verifyJWT( refreshToken, foundToken.privateKey)
            await tokenService.deleteKeyById(user_id)
          
            throw new ForbiddenError("Something wrong happend !!! Pls relogin")
        }

        const holderToken = await tokenService.findByRefreshTokenByUser(refreshToken);
        if(!holderToken) throw new AuthFailureError("User not registered");
        const { user_id, email } = await verifyJWT( refreshToken, holderToken.privateKey);

        const foundUser = await findById(user_id);
        if(!foundUser) throw new AuthFailureError("Shop not registered");

        const tokens = await  createTokenPair({ user_id: foundUser.id, email }, holderToken.publicKey, holderToken.privateKey);
        //update refreshToken and refreshToken used
        const tokenUsed = JSON.parse(holderToken.refreshTokenUsed);
        
        holderToken.refreshToken = tokens.refreshToken;
        holderToken.refreshTokenUsed = JSON.stringify([...tokenUsed, refreshToken]);
        holderToken.save();
        
        return {
            user: { user_id, email},
            tokens,
        }
    }

    static logout = async (keyStore) => {
        const delKey = await tokenService.removeKeyById(keyStore.id);
        return delKey;
    }

    static login = async ({ email, password, refreshToken = null}) => {

        //check exits email
        const foundUser = await db.User.findOne({where: {email} ,raw: true})
        if(!foundUser) throw new BadRequestError("User not registered")

        // //check match password
        const match = await bcrypt.compare(password, foundUser.password);
        if(!match) throw new AuthFailureError('Authentication error')


        // //create privateKey, public key
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')


        // // generator tokens
        const tokens = await createTokenPair({ user_id: foundUser.id, email }, publicKey, privateKey);

        await tokenService.createKeyToken({
            userId: foundUser.id,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken,
        })

        return {
            metadata: {
                shop: getInfoData({field: ['_id', 'name', 'email'], object: foundUser}),
                tokens,
            }
        }
    }

    static signUp = async (data) => {
            const { email, password } = data;
            //step1: check email exists
            const holderUser = await db.User.findOne({raw: true, where: {email}})

            if (holderUser) {
                throw new BadRequestError('Error: Email already registered')
            }

            //step2: encode password
            const passwordHash = await bcrypt.hash(password, 10)

            //step3: create user
            const newUser = await db.User.create({
                ...data,
               password: passwordHash
            })

            if (newUser) {
                // const privateKey = crypto.randomBytes(64).toString('hex')
                // const publicKey = crypto.randomBytes(64).toString('hex')

                // const keyStore = await keyTokenService.createKeyToken({
                //     userId: newShop._id,
                //     publicKey,
                //     privateKey
                // })

                // if (!keyStore) {
                //     throw new BadRequestError('Error: Key Store Error')
                // }

                // //create token pair
                // const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);


                //step4: response data
                return {
                    code: 201,
                    metadata: {
                        user: getInfoData({field: ['id', 'fullName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'sex'], object: newUser}),
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }
    }
}

module.exports = AccessService;