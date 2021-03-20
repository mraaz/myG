const cryptico = require('cryptico')

class EncryptionRepository {

  async getEncryptionKeyPair() {
    if (this.privateKey && this.publicKey) return { privateKey: this.privateKey, publicKey: this.publicKey }
    const pin = process.env.PROFILE_ENCRYPTION_PIN | 123456;
    this.privateKey = cryptico.generateRSAKey(`${pin}`, 1024);
    this.publicKey = cryptico.publicKeyString(this.privateKey);
    return { privateKey: this.privateKey, publicKey: this.publicKey }
  }

  async encryptField(field) {
    try {
      const { privateKey, publicKey } = await this.getEncryptionKeyPair();
      return cryptico.encrypt(field, publicKey, privateKey).cipher;
    } catch(error) {
      console.error(`Failed to Encrypt: ${field}`, this.privateKey, this.publicKey);
      return null;
    }
  }

  async decryptField(field) {
    if (!field) return field;
    try {
      const { privateKey } = await this.getEncryptionKeyPair();
      return cryptico.decrypt(field, privateKey).plaintext || field;
    } catch(error) {
      console.error(`Failed to Decrypt: ${field}`, this.privateKey, this.publicKey);
      return field;
    }
  }

}

module.exports = new EncryptionRepository();