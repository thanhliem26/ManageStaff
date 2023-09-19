'use strict'

// const KeyTokenMoel= require('../models/keytoken.model');
import db from '../models';

class keyTokenService {

    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
        try {
            const filter = { user_id: userId, refreshToken: refreshToken};
            const update = {publicKey, privateKey, refreshTokenUsed: [], refreshToken};
            const options = { upsert: true, new: true }

            // const tokens = await db.Token.findOneAndUpdate(filter);
            console.log("🚀 ~ tokens:", tokens)

            // const tokens = await KeyTokenMoel.findOneAndUpdate(filter, update, options)

            // return tokens ? tokens.publicKey : null;
        } catch(error) {
            return error;
        }
    }

    // static findByUserId = async (userId) => {
    //     const key = await KeyTokenMoel.findOne({user: new Types.ObjectId(userId)}).lean()
    //     return key;
    // }

    // static removeKeyById = async (id) => {
    //     return await KeyTokenMoel.deleteOne(id);
    // }

    // static findByRefreshTokenUsed =  async (refreshToken) => {
    //     return await KeyTokenMoel.findOne({refreshTokenUsed: refreshToken}).lean()
    // }

    // static deleteKeyById = async ( userId ) => {
    //     return await KeyTokenMoel.deleteOne({user: new Types.ObjectId(userId)})
    // }

    // static findByRefreshTokenByUser = async (refreshToken) => {
    //     return await KeyTokenMoel.findOne({refreshToken: refreshToken})
    // }
}

module.exports = keyTokenService;