class Logger {
  static log(message: string): void {
    console.log(`[INFO]: ${message}`)
  }

  static error(message: string): void {
    console.error(`[ERROR]: ${message}`)
  }
}

export default Logger