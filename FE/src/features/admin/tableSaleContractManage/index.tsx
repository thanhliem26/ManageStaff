import React from "react";
import { Space, Table, Tag } from "antd";

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const TableSaleContractManage: React.FC = () => (
  <Table dataSource={data}>
    {/* <ColumnGroup title="Customer Information"> */}
      <Column title="Type contract" dataIndex="firstName" key="firstName" />
      <Column title="Number contract" dataIndex="lastName" key="lastName" />
      <Column title="Customer name" dataIndex="lastName" key="lastName" />
      <Column title="address" dataIndex="lastName" key="lastName" />
    {/* </ColumnGroup> */}
    {/* <ColumnGroup title="Package"> */}
      <Column title="package" dataIndex="lastName" key="lastName" />
      <Column title="Package price" dataIndex="lastName" key="lastName" />
      <Column title="Photo receipt date" dataIndex="lastName" key="lastName" />
    {/* </ColumnGroup> */}
    {/* <ColumnGroup title="Pay"> */}
      <Column title="Paid" dataIndex="age" key="age" />
      <Column title="Arise" dataIndex="address" key="address" />
      <Column title="Remaining" dataIndex="lastName" key="lastName" />
      <Column
      title="Total value of the contract"
      dataIndex="tags"
      key="tags"
      render={(tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    {/* </ColumnGroup> */}
    {/* <ColumnGroup title="Link image"> */}
    <Column
      title="Link image"
      key="action"
      render={(_: any, record: DataType) => (
        <Space size="middle">
          <a>Invite {record.lastName}</a>
          <a>Delete</a>
        </Space>
      )}
    />
    {/* </ColumnGroup> */}
   
  </Table>
);

export default TableSaleContractManage;
