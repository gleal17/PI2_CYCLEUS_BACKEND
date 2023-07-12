import { NextFunction, Request, Response } from 'express'
import { verify } from "jsonwebtoken"


interface PayLoad {
    userId: string
    name: string
}
const secrect = process.env.JWT_SECRET || ''

export function UserAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
  const authToken = req.headers.authorization
  if (!authToken) {
    return res.status(401).end()
  }
  const [, token] = authToken.split(' ')
  try {
    const { role } = verify(token, secret) as PayLoad
    if (role !== Role.ADMIN) {
      return res.status(403).send(new NotAdminError().name)
    }
    return next()
  } catch (error) {
    return res.status(401).end()
  }
}
