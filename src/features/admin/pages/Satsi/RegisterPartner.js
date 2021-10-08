import { format, parseISO } from 'date-fns';
import TableData from '../../../../components/TableData';

const RegisterPartner = () => {
  const tableApi = process.env.REACT_APP_API_URL_LP + '/CTV';

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      sortable: false,
      width: 100,
    },
    {
      field: 'CodeCTV',
      headerName: 'Mã CTV',
      width: 200,
    },
    {
      field: 'Name',
      headerName: 'Tên',
      sortable: false,
      width: 220,
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
    { field: 'Adress', headerName: 'Địa chỉ', sortable: false, width: 300 },
    {
      field: 'Company',
      headerName: 'Đơn vị công tác hiện tại',
      sortable: false,
      width: 300,
    },
    {
      field: 'Presenter',
      headerName: 'Tên người giới thiệu',
      sortable: false,
      width: 300,
    },
    {
      field: 'PhonePresenter',
      headerName: 'SĐT người giới thiệu',
      sortable: false,
      width: 300,
    },
    {
      field: 'CodeCompany',
      headerName: 'Mã số chi nhánh',
      sortable: false,
      width: 300,
    },
    {
      field: 'Created_at',
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
      label: 'CodeCTV',
      key: 'Mã CTV',
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
    { label: 'Adress', key: 'Địa chỉ' },
    {
      label: 'Company',
      key: 'Đơn vị công tác hiện tại',
    },
    {
      label: 'Presenter',
      key: 'Tên người giới thiệu',
    },
    {
      label: 'PhonePresenter',
      key: 'SĐT người giới thiệu',
    },
    {
      label: 'CodeCompany',
      key: 'Mã số chi nhánh',
    },
    {
      label: 'Created_at',
      key: 'Ngày đăng ký',
    },
  ];

  const titleTable = 'Danh sách cộng tác viên';

  const filename = 'danh_sach_CTV.csv';

  const createData = (notes) => {
    const rows = notes
      .filter((data) => data.status === 0)
      .map(
        ({
          id,
          CodeCTV,
          Name,
          PhoneNumber,
          Email,
          Adress,
          Company,
          Presenter,
          PhonePresenter,
          CodeCompany,
          Created_at,
        }) => {
          return {
            id,
            CodeCTV,
            Name,
            PhoneNumber,
            Email,
            Adress,
            Company,
            Presenter,
            PhonePresenter,
            CodeCompany,
            Created_at: format(parseISO(Created_at), "h:m a '-' dd/MM/yyyy"),
          };
        }
      );
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

export default RegisterPartner;
