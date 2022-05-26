
const dataMethods = ["body", "params", "query"]

const validation = (schema) => {
    return (req, res, next) => {
        const validationErrArr = []
        dataMethods.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false })
                if (validationResult.error) {
                    validationErrArr.push(validationResult.error.details)
                }
            }
        })
          if (validationErrArr.length) {
              res.json({message:"validation error", error: validationErrArr})
          } else {
              next()
          }

    }
}

module.exports = validation