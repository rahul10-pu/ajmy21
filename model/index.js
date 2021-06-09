import pgconfig from '../config/db.postgres.config.js'
import Sequelize from 'sequelize'
import role from "./role.model.js"
import user from "./user.model.js"
import tutorial from "./tutorial.model.js"

const sequelize = new Sequelize(pgconfig.DB, pgconfig.USERNAME, pgconfig.PASSWORD, {
     host: pgconfig.HOST,
     dialect: pgconfig.DIALECT,
     port: pgconfig.PORT,
     operatorAliases: false,
     pool:{
        max:pgconfig.max,
        min:pgconfig.min,
        idle:pgconfig.idle,
        acquire:pgconfig.acquire
     }

 });

 const db={
     Sequelize:Sequelize,
     sequelize:sequelize,
     //sequelize - used to make schema inside the tutorial function
     //Sequelize - used for defining the standard data types from the 'sequelize' module
     tutorials: tutorial(sequelize, Sequelize),
     users: user(sequelize, Sequelize),
     roles: role(sequelize, Sequelize)
 }
 db.roles.belongsToMany(db.users,{
     through:"user_role",
     foreignKey:"roleId",
     otherKey:"userId"
 })
 db.users.belongsToMany(db.roles,{
    through:"user_role",
    foreignKey:"userId",
    otherKey:"roleId"
})
db.ROLES=["user","admin","moderator"]
export default db;