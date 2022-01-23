import { Construct } from '@aws-cdk/core'
import { Vpc, IVpc, SecurityGroup, SelectedSubnets, ISecurityGroup } from '@aws-cdk/aws-ec2'
import { subnetGroupNameFromConstructId } from '@aws-cdk/aws-ec2/lib/util'

// VPC Configuration Environment Variables
// - process.env.vpcId
// - process.env.vpcName
// - process.env.vpcSubnetGroupNameTag
// - process.env.securityGroupId

export const getVPC = (scope: Construct): IVpc => {
  return Vpc.fromLookup(scope, 'lambda-vpc', {
    vpcId: 'vpc-0870ce2d0cbc33b54'
  })
}

export const getPrivateVpcSubnet = (vpc: IVpc): SelectedSubnets => {
  const subnets = vpc.selectSubnets({
    subnets: vpc.privateSubnets.filter((subnet) => {
      console.log(subnet)
      return subnetGroupNameFromConstructId(subnet).toLowerCase()
    })
  })
  return subnets
}

export const getSecurityGroups = (scope: Construct, id: string): ISecurityGroup[] => {
  return [SecurityGroup.fromSecurityGroupId(scope, id, 'sg-0409ccec48fe5ba39')]
}
