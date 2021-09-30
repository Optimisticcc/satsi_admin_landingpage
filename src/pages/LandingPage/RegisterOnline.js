import { format, parseISO } from 'date-fns/esm';
import TableData from '../../components/TableData';

const RegisterOnline = () => {
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
      sortable: false,
      width: 200,
    },
    { field: 'gender', headerName: 'Giới tính', sortable: false, width: 120 },
    {
      field: 'age',
      headerName: 'Tuổi',
      width: 120,
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
    { field: 'address', headerName: 'Địa chỉ', sortable: false, width: 300 },
    {
      field: 'height',
      headerName: 'Chiều cao',
      sortable: false,
      width: 150,
    },
    {
      field: 'weight',
      headerName: 'Cân nặng',
      sortable: false,
      width: 150,
    },
    { field: 'health', headerName: 'Sức khỏe', sortable: false, width: 150 },
    { field: 'tattoo', headerName: 'Hình xăm', sortable: false, width: 150 },
    {
      field: 'knowledge',
      headerName: 'Trình độ học vấn',
      sortable: false,
      width: 200,
    },
    {
      field: 'language',
      headerName: 'Trình độ ngoại ngữ',
      sortable: false,
      width: 200,
    },
    {
      field: 'howToKnow',
      headerName: 'Biết chương trình qua',
      sortable: false,
      width: 200,
    },
    {
      field: 'namePerson',
      headerName: 'Người giới thiệu',
      sortable: false,
      width: 300,
    },
    {
      field: 'resultCondition',
      headerName: 'Kết quả',
      sortable: false,
      width: 150,
    },
    {
      field: 'created_at',
      headerName: 'Ngày đăng ký',
      sortable: false,
      type: Date,
      width: 200,
    },
  ];

  const headersExcel = [
    { label: 'Mã số', key: 'id' },
    { label: 'Họ và Tên', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Mật khẩu', key: 'password' },
    { label: 'Giới tính', key: 'gender' },
    { label: 'Vai trò', key: 'role' },
    { label: 'Loại điện thoại', key: 'phoneType' },
    { label: 'Số điện thoại', key: 'phoneNumber' },
    { label: 'Sinh nhật', key: 'birthday' },
    { label: 'Địa chỉ', key: 'address' },
    { label: 'Mô tả', key: 'describe' },
    { label: 'Facebook', key: 'facebook' },
    { label: 'Mã số phụ huynh', key: 'parentId' },
    { label: 'Tên phụ huynh', key: 'parentName' },
    { label: 'Mã lớp học', key: 'classId' },
    { label: 'Trình độ', key: 'knowledge' },
    { label: 'Trường học hiện tại', key: 'school' },
    { label: 'Mã số sale phụ trách', key: 'saleId' },
    { label: 'Mã số giáo viên phụ trách', key: 'teacherId' },
    { label: 'Mã người phụ trách', key: 'PersonID' },
    { label: 'Ngày nhập học', key: 'start' },
  ];

  const tableApi = process.env.REACT_APP_API_URL_LP + '/Test';

  const titleTable = 'Danh sách sơ tuyển online LandingPage';

  const filename = 'danh_sach_so_tuyen_online.csv';

  const createData = (notes) => {
    const rows = notes
      .filter((data) => data.status === 0)
      .map(
        ({
          id,
          name,
          gender,
          age,
          phoneNumber,
          email,
          address,
          height,
          weight,
          health,
          tattoo,
          knowledge,
          language,
          howToKnow,
          namePerson,
          resultCondition,
          created_at,
        }) => {
          return {
            id,
            name,
            gender,
            age,
            phoneNumber,
            email,
            address,
            height,
            weight,
            health,
            tattoo,
            knowledge,
            language,
            howToKnow,
            namePerson,
            resultCondition:
              resultCondition === 1 ? 'Trúng sơ tuyển' : 'Trượt sơ tuyển',
            created_at: format(parseISO(created_at), "h:m a '-' dd/MM/yyyy"),
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

export default RegisterOnline;
