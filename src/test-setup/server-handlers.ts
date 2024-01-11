import { HttpResponse, http } from 'msw'

const handlers = [
  http.post('/api/user/signup', () => {
    return HttpResponse.json({ success: true })
  })
]

export { handlers }
