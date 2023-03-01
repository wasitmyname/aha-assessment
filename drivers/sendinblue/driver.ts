import nodemailer from 'nodemailer'
import { SendinblueConfig } from './config'
import sendinblueTransport from 'nodemailer-sendinblue-transport'
import { MailDriverContract, MessageNode } from '@ioc:Adonis/Addons/Mail'

export class SendinblueDriver implements MailDriverContract {
  private transporter: any

  constructor(private config: SendinblueConfig) {
    /**
     * Instantiate the nodemailer transport
     */
    this.transporter = nodemailer.createTransport(
      new sendinblueTransport(this.config)
    )
  }

  /**
   * Send email using the underlying transport
   */
  public async send(message: MessageNode) {
    return this.transporter.sendMail(message)
  }

  /**
   * Cleanup resources
   */
  public close() {
    this.transporter.close()
    this.transporter = null
  }
}