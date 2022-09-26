 const validateRegister = async (req, res, next) => {
    const { username, password, gender, yearsOld, city } = req.body
  
    const errors = [];
  
    if(!username){
      errors.push("Please add your username.")
    }else if(username.length > 20){
      errors.push("Your name is up to 20 chars long.")
    }
  
    if(password.length < 6){
      errors.push("Password must be at least 6 chars.")
    }

    if(!gender){
        errors.push("Please add your gender.")
    }
    
    if(!yearsOld){
        errors.push("Please add your age.")
    }

    if(!city){
        errors.push("Please add your city.")
    }
  
    if(errors.length > 0) return res.status(400).json({msg: errors})
  
    next();
}

module.exports = validateRegister