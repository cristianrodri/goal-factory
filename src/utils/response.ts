import { NextResponse } from 'next/server'
import { Status } from './enums'

export const successResponse = (data: unknown, status = Status.SUCCESS) => {
  return NextResponse.json({ success: true, data }, { status })
}

export const errorResponse = (message: string, status = Status.BAD_REQUEST) => {
  return NextResponse.json({ success: false, message }, { status })
}
