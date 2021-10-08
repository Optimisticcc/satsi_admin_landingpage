import { format, parseISO } from 'date-fns';
import TableData from '../../../../components/TableData';

const RegisterProgram = () => {
  const tableApi = process.env.REACT_APP_API_URL_S + '/Contact';

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      sortable: false,
      width: 100,
    },
    {
      field: 'Name',
      headerName: 'Tên',
      sortable: false,
      width: 200,
    },
    {
      field: 'PhoneNumber',
      headerName: 'Số điện thoại',
      sortable: false,
      width: 200,
    },
    {
      field: 'Email',
      headerName: 'Email',
      sortable: false,
      width: 300,
    },
    {
      field: 'Service',
      headerName: 'Dịch vụ quan tâm',
      sortable: false,
      width: 300,
    },
    {
      field: 'SendDay',
      headerName: 'Ngày đăng ký',
      sortable: false,
      type: Date,
      width: 200,
    },
  ];

  const headersExcel = [
    {
      label: 'id',
      key: 'ID',
    },
    {
      label: 'Name',
      key: 'Tên',
    },
    {
      label: 'PhoneNumber',
      key: 'Số điện thoại',
    },
    {
      label: 'Email',
      key: 'Email',
    },
    { label: 'Service', key: 'Dịch vụ quan tâm' },
    {
      label: 'SendDay',
      key: 'Ngày đăng ký',
    },
  ];

  const titleTable = 'Danh sách tham gia chương trình';

  const filename = 'danh_sach_tham_gia_chương trình.csv';

  const createData = (notes) => {
    const rows = notes
      .filter((data) => data.status === 0)
      .map(({ id, Name, PhoneNumber, Email, Service, SendDay }) => {
        return {
          id,
          Name,
          PhoneNumber,
          Email,
          Service,
          SendDay: format(parseISO(SendDay), "h:m a '-' dd/MM/yyyy"),
        };
      });
    return rows;
  };

  return (
    <TableData
      columns={columns}
      createData={createData}
      headersExcel={headersExcel}
      tableApi={tableApi}
      titleTable={titleTable}
      filename={filename}
      isRemove={0}
    />
  );
};

export default RegisterProgram;
