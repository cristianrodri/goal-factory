class User {
  private userId: string

  constructor() {
    this.userId = ''
  }

  get id(): string {
    return this.userId
  }

  setId(id: string) {
    this.userId = id
  }
}

export const user = new User()
