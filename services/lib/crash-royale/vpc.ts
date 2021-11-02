import { Vpc, IVpc, SubnetType, SecurityGroup, SelectedSubnets, ISecurityGroup, VpcLookupOptions } from '@aws-cdk/aws-ec2'
import { subnetGroupNameFromConstructId } from '@aws-cdk/aws-ec2/lib/util'
import { Construct } from '@aws-cdk/core'

// VPC Configuration Environment Variables
// - process.env.vpcId
// - process.env.vpcName
// - process.env.vpcSubnetGroupNameTag
// - process.env.securityGroupId

export const getVPC = (scope: Construct): IVpc => {
  return Vpc.fromLookup(scope, 'lambda-vpc', {
    vpcName: process.env.VPC_NAME,
    isDefault: false,
    subnetGroupNameTag: process.env.VPC_SUBNET_GROUP_NAME_TAG
  })
}

export const getPrivateVpcSubnet = (vpc: Vpc): SelectedSubnets => {
  const subnets = vpc.selectSubnets({
    subnets: vpc.privateSubnets.filter((subnet) => {
      return subnetGroupNameFromConstructId(subnet).toLowerCase() === SubnetType.PRIVATE.toLowerCase()
    })
  })
  return subnets
}

export const getSecurityGroups = (scope: Construct, id: string): ISecurityGroup[] => {
  return [SecurityGroup.fromSecurityGroupId(scope, id, process.env.SECURITY_GROUP_ID || 'MISSING SECURITY GROUP ID')]
}
