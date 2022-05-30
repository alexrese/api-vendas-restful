import "reflect-metadata"
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express'

import cors from 'cors'
import routes from './routes'
import AppError from '@shared/errors/AppError'
import StatusCodes from '@shared/enums/eStatusCode'

import '@shared/database'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction) =>{
  if(error instanceof AppError)
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })

  return response.status(StatusCodes.Server).json({
    error: 'Error',
    message: 'Internal Server Error'
  })
})

app.listen(3333, () => {
  console.log(`Server Running in the Port 3333`);
} )
