import { cdkSynth, promptForStack } from "./common"

const run = async () => {
  await cdkSynth()
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
