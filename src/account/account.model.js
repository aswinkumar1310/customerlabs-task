const sequelize = require("../../config/db.config");
const { DataTypes } = require("sequelize")
const { ACCOUNT, DESTINATION } = require("../../utils/constants");
const account = sequelize.define(ACCOUNT, {
    email: { type: DataTypes.STRING, allowNull: false },
    accountName: { type: DataTypes.STRING, allowNull: false },
    appSecret: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true, allowNull: false },
    website: { type: DataTypes.STRING, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
})

const destination = sequelize.define(DESTINATION, {
    url: { type: DataTypes.STRING, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    headers: { type: DataTypes.JSON, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
})
account.hasMany(destination, { foreignKey: "accountId", onDelete: 'CASCADE' })
destination.belongsTo(account, { foreignKey: "accountId", })
module.exports = { account, destination }