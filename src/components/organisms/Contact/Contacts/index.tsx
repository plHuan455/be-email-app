import { ContactType } from '@containers/ContactContainer/Contacts/interface';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

interface ContactsProps {
  rows: ContactType[];
  columns: GridColDef[];
  handleRowClick: (any) => void;
}

const Contacts: React.FC<ContactsProps> = ({ rows, columns, handleRowClick }) => {
  console.log(rows);
  return (
    <div className="px-6 flex-1 overflow-hidden flex flex-col">
      <div style={{ height: '85%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          style={{ backgroundColor: '#fff', borderRadius: 15 }}
          // onRowClick={(params) => handleRowClick(params)}
          onCellClick={(params) => handleRowClick(params)}
        />
      </div>
    </div>
  );
};

export default Contacts;
