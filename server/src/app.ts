import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import routes from './routes'

export const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json());
app.use(routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const uri: string = `mongodb+srv://admin:SyxDGZst4uf51aOh@cluster0.xnapz.mongodb.net/userHobbies?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.set('useFindAndModify', false)
mongoose
  .connect(uri, options)
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      )
    }
  })
  .catch((error) => {
    throw error
  })
