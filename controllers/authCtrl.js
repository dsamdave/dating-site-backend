const  Users  = require  ('../models/userModel')
const  bcrypt  = require  ('bcrypt')
const  jwt  = require  ('jsonwebtoken')
const tokens = require  ("../config/generateToken")

const { generateAccessToken, generateRefreshToken } = tokens

const authCtrl = {
    register: async (req, res) => {
        
        try {
            
            const { username, password, gender, yearsOld, city } = req.body
            let newUserName = username.toLowerCase().replace(/ /g, '')

            const user_name = await Users.findOne({username: newUserName})
            if(user_name) return res.status(400).json({msg: "This user already exists."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                username: newUserName, password: passwordHash, gender, yearsOld, city
            })

            const access_token = generateAccessToken({id: newUser._id})
            const refresh_token = generateRefreshToken({id: newUser._id}, res)

            await newUser.save()

            res.json({
                msg: 'Registration Successful!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })

        }  catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },

    login: async (req, res) => {
        try {

            const { userName, password } = req.body

            const user = await Users.findOne({userName})
            .populate("followers following", "avatar username followers following")

            if(!user) return res.status(400).json({msg: "This user does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const access_token = generateAccessToken({id: user._id})
            const refresh_token = generateRefreshToken({id: user._id}, res)

            await Users.findOneAndUpdate({_id: user._id}, {
                rf_token: refresh_token
              })
            
            res.json({
                msg: 'Login Successful!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            return res.json({msg: "Logged out!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: async(req, res) => {
      try {
        const rf_token = req.cookies.refreshtoken
        if(!rf_token) return res.status(400).json({msg: "Please login now!"})
  
        const decoded = jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
        if(!decoded.id) return res.status(400).json({msg: "Please login now!"})
  
        const user = await Users.findById(decoded.id).select("-password +rf_token")

        if(!user) return res.status(400).json({msg: "This account does not exist."})
  
        // if(rf_token !== user.rf_token)
        //   return res.status(400).json({msg: "Please login now!"})
  
        const access_token = generateAccessToken({id: user._id})
        const refresh_token = generateRefreshToken({id: user._id}, res)
  
        await Users.findOneAndUpdate({_id: user._id}, {
          rf_token: refresh_token
        })
  
        res.json({ access_token, user })
        
      } catch (err) {
        return res.status(500).json({msg: err.message})
      }
    }

}


module.exports = authCtrl
