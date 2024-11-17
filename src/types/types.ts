export interface Config {
    aboutMe: {
      name: string,
      currentPage: number
    },
    address: {
      name: string,
      currentPage: number
    },
    dateOfBirth: {
      name: string,
      currentPage: number
    }
}

export interface FormData {
    email?: string,
    password?:  string,
    aboutMeText?: string,
    dob?: string,
    address?: string
    city?: string
    state?: string
    zip?: string
}