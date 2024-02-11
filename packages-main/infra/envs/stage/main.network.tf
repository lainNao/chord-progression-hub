####################################################
# Public Subnet
####################################################

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id
  tags = {
    env = local.env
  }
}

resource "aws_subnet" "public_1a" {
  vpc_id            = aws_vpc.this.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${local.region}a"
  tags = {
    env = local.env
  }
}

resource "aws_subnet" "public_1b" {
  vpc_id            = aws_vpc.this.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${local.region}b"
  tags = {
    env = local.env
  }
}

####################################################
# Private Subnet
####################################################

resource "aws_subnet" "private_1a" {
  vpc_id            = aws_vpc.this.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "${local.region}a"
  tags = {
    env = local.env
  }
}

resource "aws_subnet" "private_1b" {
  vpc_id            = aws_vpc.this.id
  cidr_block        = "10.0.20.0/24"
  availability_zone = "${local.region}b"
  tags = {
    env = local.env
  }
}

####################################################
# Elastic IP for nat
####################################################
resource "aws_eip" "nat_1a" {
  domain = "vpc"
  tags = {
    env = local.env
  }
}

####################################################
# NAT Gateway
####################################################
# nat経由でインターネットへアクセスできるプライベートサブネットはいずれcodebuildを構築するときに置く場所です。
resource "aws_nat_gateway" "nat_1a" {
  subnet_id     = aws_subnet.public_1a.id
  allocation_id = aws_eip.nat_1a.id
  tags = {
    env = local.env
  }
}

####################################################
# Public Subnet Route Table
####################################################
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.this.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.this.id
  }
  tags = {
    env = local.env
  }
}

####################################################
# Public Route Table Association
####################################################
resource "aws_route_table_association" "public_1a_to_ig" {
  subnet_id      = aws_subnet.public_1a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_1b_to_ig" {
  subnet_id      = aws_subnet.public_1b.id
  route_table_id = aws_route_table.public.id
}

####################################################
# Private Subnet Route Table
####################################################
resource "aws_route_table" "private_1a" {
  vpc_id = aws_vpc.this.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_1a.id
  }
  tags = {
    env = local.env
  }
}

####################################################
# Private Route Table Association
####################################################
resource "aws_route_table_association" "private_1a" {
  route_table_id = aws_route_table.private_1a.id
  subnet_id      = aws_subnet.private_1a.id
}
