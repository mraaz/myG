import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import * as Services from '../lib/crash-royale/crash-royale-stack'

test('Empty Stack', () => {
  const app = new cdk.App()
  // WHEN
  const stack = new Services.ClashRoyaleStack(app, 'MyTestStack')
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {}
      },
      MatchStyle.EXACT
    )
  )
})
