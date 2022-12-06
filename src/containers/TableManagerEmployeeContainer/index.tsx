import TableManagerEmployee from "@components/organisms/TableManagerEmployeeContainer/TableManagerEmployee";
import { Manager } from "@page/Manager/interface";
import { useState } from "react";

interface TableManagerEmployeeContainerProps {
  data?: Manager[]
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TableManagerEmployeeContainer: React.FC<TableManagerEmployeeContainerProps> = ({
  data = [],
  onUpdate,
  onDelete,
}) => {
  const [tablePageParams, setTablePageParams] = useState<{page: number; limit: number, total: number}>({page: 0, limit: 5, total: 0});
  return (
    <TableManagerEmployee
      page={tablePageParams.page}
      limit={tablePageParams.limit}
      total={data.length}
      data={data.slice(
        tablePageParams.page * tablePageParams.limit, 
        tablePageParams.page * tablePageParams.limit + tablePageParams.limit
      )} 
      onUpdate={onUpdate} 
      onDelete={onDelete}
      onChangeLimit={(limit) => setTablePageParams(preState => ({...preState, limit}))}
      onChangePage={(page) => setTablePageParams(preState => ({...preState, page}))}
    />
  )
}

export default TableManagerEmployeeContainer;