const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'the email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if (createdUser) {
                resolve({
                    status: 'ok',
                    message: 'Success',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const loginUser = (userLogin) => {
    return new Promise( async (resolve, reject) => {
        const {  email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'err',
                    message: 'the user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: 'err',
                    message: 'the password or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin

            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'ok',
                message: 'Success',
                access_token,
                refresh_token
            })
            // }
        } catch (e) {
            reject(e)
        }
    })
}
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
       
        try {
            const checkUser = await User.findOne({
                _id: id
               
            })
            console.log('checkUser', checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'oke',
                    message: 'the user is not defined'
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data, {new: true})
            console.log("updateUser", updateUser)
            resolve({
                status: 'ok',
                message: 'Success',
                data: updateUser
            })
        } catch (e) {
            reject(e)
        }
    })
}
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
       
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log('checkUser', checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'oke',
                    message: 'the user is not defined'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'ok',
                message: 'DELETE USER Success'
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'ok',
                message: 'Get all user Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
       
        try {
            const user = await User.findOne({
                _id: id
            })
            // console.log('checkUser', checkUser)
            if (user === null) {
                resolve({
                    status: 'oke',
                    message: 'the user is not defined'
                })
            }
            resolve({
                status: 'ok',
                message: 'get details user Success',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
  
}