export const getParam = (req: Request, param: string) => {
  const url = new URL(req.url)

  return url.searchParams.get(param)
}
