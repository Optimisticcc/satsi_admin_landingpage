import { DataGrid } from '@material-ui/data-grid';
import { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TableToolbar from './TableToolbar';
import './style.css';

const TableData = ({
  columns,
  createData,
  headersExcel,
  tableApi,
  titleTable,
  filename,
  isRemove = 1,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRow, setTotalRow] = useState(1);
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const rowsPerPage = 50;

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(
      `${tableApi}/Status/false?page=${currentPage + 1}&size=${rowsPerPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch data for thar resource');
        }
        setTotalRow(res.headers.get('Content-Range'));
        return res.json();
      })
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
        } else {
          //   console.log(err);
        }
      });

    return () => abortCont.abort();
  }, [tableApi, currentPage, rowsPerPage]);

  const rows = createData(notes);
  console.log(rows);

  const handleSelectionChange = (e) => {
    if (e.selectionModel.length !== 0) {
      setSelected(e.selectionModel);
      return;
    }

    setSelected([]);
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.page);
  };

  const handleDownLoadCSV = (ref, getData) => {
    let selectedDataTemp = [];

    selected.forEach((row, index) => {
      let objectData = notes.find((note) => note.id === row);
      objectData.status = isRemove;
      selectedDataTemp.push(objectData);

      fetch(`${tableApi}/${row}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objectData),
        redirect: 'follow',
      })
        .then((res) => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource');
          }
          return res.json();
        })
        .then((data) => {
          if (selected.length - 1 === index) {
            setTimeout(() => {
              ref.current.link.click();
              setTotalRow(totalRow - selected.length);
              setSelected([]);
              forceUpdate();
            }, 2000);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });

    getData(selectedDataTemp);
  };

  const CustomToolbar = () => {
    return (
      <TableToolbar
        selected={selected}
        headers={headersExcel}
        handleDownLoadCSV={handleDownLoadCSV}
        filename={filename}
        title={titleTable}
      />
    );
  };

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        page={currentPage}
        pageSize={rowsPerPage}
        rowCount={parseInt(totalRow)}
        rowsPerPageOptions={[]}
        paginationMode='server'
        checkboxSelection
        onPageChange={(e) => handlePageChange(e)}
        onSelectionModelChange={(e) => handleSelectionChange(e)}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default TableData;
