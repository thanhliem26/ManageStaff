const { Model } = require('sequelize');

class BaseModel extends Model {
  static async findOneAndUpdate(filter = {}, values, options) {
    console.log("🚀 ~ filter:", filter)
    const instance = await this.findOne(filter);
    // if (!instance) {
    //   throw new Error('Not found.');
    // }

    // await instance.update(values, options);
    // return instance;
  }
}

module.exports = BaseModel;