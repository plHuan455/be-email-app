import { getDepartmentsByRole } from '@api/deparment';
import Icon from '@components/atoms/Icon';
import Loading from '@components/atoms/Loading';
import SubSidebar from '@components/organisms/SubSidebar';
import { subMenuDepartment, SubSidebarItem } from '@constants/subMenus';
import useLocalStorage from '@hooks/useLocalStorage';
import Layout from '@layouts/Layout';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Manager = () => {
  const [currentRole] = useLocalStorage('current_role', '');
  const [menus, setMenus] = useState<SubSidebarItem[]>([]);

  const navigate = useNavigate();

  const ROOT_NAVIGATE = '/department';

  const { data: departmentQueryData, isLoading: isLoadingQueryData } = useQuery({
    queryKey: ['get-departments'],
    queryFn: getDepartmentsByRole,
    onSuccess: (res) => {
      const resData = res.data;

      const convertToMenus: SubSidebarItem[] = resData.map((data) => {
        const { name, id } = data;

        return {
          name,
          navigate: `${ROOT_NAVIGATE}/${id}/employee`,
          icon: <Icon icon="department" color="black" />,
        };
      });

      setMenus(convertToMenus);
    },
  });

  useEffect(() => {
    if (!isEmpty(menus)) navigate(menus[0].navigate ?? '');
  }, [menus]);

  return (
    <Layout.Content>
      <Layout.ASide>
        {isLoadingQueryData ? (
          <Loading isLoading={isLoadingQueryData} />
        ) : (
          <SubSidebar menus={menus} title="Department" />
        )}
      </Layout.ASide>
      <Outlet />
    </Layout.Content>
  );
};

export default Manager;
