import React, { FC, useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';
import get from 'lodash/get';
import filter from 'lodash/filter';
import some from 'lodash/some';
import DataTable from '@components/molecules/DataGrid';
import { useQuery } from '@tanstack/react-query';
import { PagedListRequest } from '@api/commonDto';
import ApiClient from '@api/ApiClient';
import _ from 'lodash';
import useDebounce from '@hooks/useDebouce';
import { Row } from '@tanstack/react-table';
import { PathAPI } from '@api/commonDto';

export interface FilterComponentProps {
  onSearch?: (searchModel?: any) => void;
  onTypeFilter?: (status: string) => void;
}

export interface PageCrudHelpers {
  setFilterModel: (filterModel: any) => void;
}

interface PageCrudDataProps extends React.PropsWithChildren {
  refreshKey?: string;
  api: PathAPI;
  exceptColumns?: Array<string>;
  onCellEdit?: (model: any) => void;
  onCellDelete?: (model: any) => void;
  onCreateClicked?: () => void;
  filterComponent?: (props: FilterComponentProps) => React.ReactNode;
  onTextSearch?: (helpers: PageCrudHelpers, evt: string) => void;
  checkCellEditable?: (model: any) => boolean;
  checkCellDeletable?: (model: any) => boolean;
  checkCellCreatable?: () => boolean;
  renderCellButtons?: (data: any) => React.ReactNode;
  columns: any;
  rowOnClick?: (row: Row<any>) => void;
  hasSimpleFilter?: boolean;
  disabledRowOnClick?: boolean;
}

const PageCrudData: FC<PageCrudDataProps> = (props) => {
  const defaultMaxResultCount = 10;
  const [pagingModel, setPagingModel] = useState<PagedListRequest>({
    limit: defaultMaxResultCount,
    page: 1,
  });
  const [sortModel, setSortModel] = useState<any>({});
  const [filterModel, setFilterModel] = useState<any>({});
  const debouceFilterModal = useDebounce(filterModel, 500);

  const fetchingData = React.useCallback(
    async (page: PagedListRequest) => {
      const { data } = await ApiClient.get(props.api, {
        ...page,
        ...sortModel,
        ...filterModel,
      });
      return data;
    },
    [sortModel, filterModel, props.refreshKey, props.api],
  );

  const dataQuery = useQuery(
    [pagingModel, sortModel, debouceFilterModal, props.refreshKey],
    () => fetchingData(pagingModel),
    {
      keepPreviousData: true,
    },
  );

  const { status, data, error, isFetching, isPreviousData, isLoading, isSuccess } =
    dataQuery;

  // useEffect(() => {
  //   console.log(filterModel)
  //   refetch()
  // }, [filterModel])

  const dataTotal = useMemo(() => {
    if (data && data.total) {
      return data.total;
    }
    return 1;
  }, [data]);

  const handlePageChange = useCallback(
    (page: number) => {
      console.log({ page });
      if (page > 0) setPagingModel({ ...pagingModel, page });
    },
    [pagingModel],
  );

  const handleChangeRowsPerPage = useCallback(
    (value: number) => {
      console.log({ value });
      setPagingModel({ page: 1, limit: value });
    },
    [pagingModel],
  );

  const handleClearSortClicked = () => {
    setSortModel({});
  };

  return (
    <div>
      {props.children}
      <DataTable
        data={get(data, 'data', [])}
        isLoading={isLoading}
        pagingModel={pagingModel}
        enableSearch
        renderCellButtons={props.renderCellButtons}
        simpleSearch={{
          onTextSearch: (keyword: string) => {
            setFilterModel({ ...filterModel, keyword });
            setPagingModel({ ...pagingModel, page: 1 });
          },
        }}
        simpleFilter={{
          onFilter: (status: string) => {
            setFilterModel({ ...filterModel, status });
          },
        }}
        hasSimpleFilter={props.hasSimpleFilter}
        advanceFilter={props.filterComponent?.({
          onSearch: (data) => setFilterModel((prev: any) => ({ ...prev, ...data })),
        })}
        checkCellCreatable={props.checkCellCreatable}
        checkCellEditable={props.checkCellEditable}
        checkCellDeletable={props.checkCellDeletable}
        onCellDelete={props.onCellDelete}
        onCreate={props.onCreateClicked}
        onCellEdit={props.onCellEdit}
        onClearSortClicked={handleClearSortClicked}
        // handleToggleSort={handleToggleSort}
        handlePageChange={handlePageChange}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        maxResultCount={pagingModel.limit ?? defaultMaxResultCount}
        totalCount={dataTotal}
        columns={filter(
          props.columns,
          (cc) => !some(props.exceptColumns, (ex) => ex === get(cc, 'accessorKey')),
        )}
        rowOnClick={props.rowOnClick}
        disabledRowOnClick={props.disabledRowOnClick}
        // enableFooter={Boolean(props.apiTotal)}
      />
    </div>
  );
};

export default PageCrudData;
