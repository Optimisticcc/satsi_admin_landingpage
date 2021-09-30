import { format, parseISO } from 'date-fns/esm';
import TableData from '../../components/TableData';

const RegisterInfor = () => {
  // column in table
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      sortable: false,
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Tên',
      sortable: true,
      width: 200,
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      sortable: false,
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      width: 300,
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      sortable: false,
      width: 400,
    },
    {
      field: 'created_at',
      headerName: 'Ngày gửi thông tin',
      sortable: false,
      type: Date,
      width: 200,
    },
  ];

  // func to create data
  const createData = (notes) => {
    const rows = notes
      .filter((data) => data.status === 0)
      .map(({ id, name, phoneNumber, email, content, created_at }) => {
        return {
          id,
          name,
          phoneNumber,
          email,
          content,
          created_at: format(parseISO(created_at), "h:m a '-' dd/MM/yyyy"),
        };
      });
    return rows;
  };

  const tableApi = `${process.env.REACT_APP_API_URL_LP}/Contact`;

  const titleTable = 'Danh sách đăng ký tư vấn LandingPage';

  const filename = 'danh_sach_dang_ky_tu_van.csv';

  // headers in excel file when export
  const headersExcel = [
    { label: 'Mã số', key: 'id' },
    { label: 'Họ và Tên', key: 'name' },
    { label: 'Số điện thoại', key: 'phoneNumber' },
    { label: 'Email', key: 'email' },
    { label: 'Nội dung', key: 'content' },
    { label: 'Ngày gửi thông tin', key: 'created_at' },
  ];

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

export default RegisterInfor;
