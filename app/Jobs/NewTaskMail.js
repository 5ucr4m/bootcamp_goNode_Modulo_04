'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  static get concurrency() {
    return 1
  }

  static get key() {
    return 'NewTaskMail-job'
  }

  async handle({
    username,
    title,
    file,
    email
  }) {
    console.log(`Job: ${NewTaskMail.key}`)
    await Mail.send(
      ['emails.new_task'], {
        username,
        title,
        hasAttachment: !!file
      },
      message => {
        message
          .to(email)
          .from('5ucr4m@gmail.com', 'Vinicius | MVTi')
          .subject('Nova tarefa pra você')

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          })
        }
      }
    )
  }
}

module.exports = NewTaskMail
