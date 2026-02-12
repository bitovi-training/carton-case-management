# __generated__ by Terraform
# Please review these resources and move them into your main configuration files.

# __generated__ by Terraform from "acl-01ee07fb2dc5048e9"
resource "aws_default_network_acl" "main" {
  default_network_acl_id = "acl-01ee07fb2dc5048e9"
  subnet_ids             = ["subnet-031da644ec62d1978", "subnet-094f902f20ff8faa7", "subnet-0c21bfbe6b59df461", "subnet-0decc1bd99c9175cb"]
  tags                   = {}
  tags_all               = {}
  egress {
    action          = "allow"
    cidr_block      = "0.0.0.0/0"
    from_port       = 0
    icmp_code       = 0
    icmp_type       = 0
    ipv6_cidr_block = null
    protocol        = "-1"
    rule_no         = 100
    to_port         = 0
  }
  ingress {
    action          = "allow"
    cidr_block      = "0.0.0.0/0"
    from_port       = 0
    icmp_code       = 0
    icmp_type       = 0
    ipv6_cidr_block = null
    protocol        = "-1"
    rule_no         = 100
    to_port         = 0
  }
}
