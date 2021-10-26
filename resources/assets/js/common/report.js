const reasons = {
  1: `I think it's inappropriate for myG`,
  2: `I think it's fake, spam, or a scam`,
  3: `I think this account may have been hacked`,
  4: `I think it's something else`
}
const subReasons = {
  1: [`I think it's not gaming related`, `I think it's not respecting the gamer's code`, `I think I'm just not a fan of this`],
  2: [
    `I think it's a fake account<>Ex: someone creates a phony profile or impersonates another person`,
    `I think it's misinformation (fake news)<>Ex: someone shares false information as if it were true`,
    `I think it's promotional or spam<>Ex: someone advertises a product for monetary gain or posts irrelevant content for high visibility`,
    `I think it's a scam, phishing, or malware<>Ex: someone asks for personal information or money or posts suspicious  links`
  ],
  3: [`You're reporting that this account may have been hacked.`],
  4: [
    `I think the topic of language is offensive<>Ex: includes profanity targeted towards individuals`,
    `I think it's adult content<>Ex: nudity, sexual scenes or language, prostitution, or sex trafficking`,
    `I think it shows or promotes extreme violence or terrorism<>Ex: torture, rape or abuse, terrorist acts, or recruitment for terrorism`,
    `I think it's harassment or a threat<>Ex: unwanted advances, personal attack, or threatening language`,
    `I think it's hate speech or harmful conduct<>Ex: racist, sexist, or another hateful/degrading language, or genocide denial`,
    ` I'm concerned this person may be suicidal<>Ex: someone threatens to harm themselves`,
    `It infringes on my rights<>Ex: includes defamation, trademark or copyright violation`
  ]
}

module.exports = {
  reasons,
  subReasons
}
