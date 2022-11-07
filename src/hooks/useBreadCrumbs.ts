import {
  BreadcrumbsState,
  BreadcrumbsStateProps,
  setBreadcrumbs,
} from '@redux/Breadcrumbs/reducer';
import { RootState, useAppDispatch, useAppSelector } from '@redux/configureStore';
import React from 'react';

const useBreadcrumbs = (route?: keyof typeof BREADCRUMBS_DICTIONARY) => {
  const { breadcrumbs, current } = useAppSelector(
    (state: RootState) => state.breadcrumbs,
  );
  const dispatch = useAppDispatch();

  const _setBreadcrumbs = (breadcrumbs: BreadcrumbsStateProps[]) => {
    const newBreadcrumbs: BreadcrumbsState = {
      breadcrumbs,
    };
    dispatch(setBreadcrumbs(newBreadcrumbs));
  };

  React.useEffect(() => {
    if (route) {
      _setBreadcrumbs(
        BREADCRUMBS_DICTIONARY[route] || BREADCRUMBS_DICTIONARY['default'],
      );
    }
  }, [route]);

  return {
    breadcrumbs,
    current,
    setBreadcrumbs: _setBreadcrumbs,
  };
};

export default useBreadcrumbs;

const breadcrumbsEMTrainingDictionary = {
  EM_TRAINING: {
    to: '',
    displayName: 'EM-Training',
  },
  EM_TRAINING_REPORT: {
    to: '/em-training/report',
    displayName: 'Report',
  },

  // Danh mục khóa học
  EM_TRAINING_COURSE_LIST: {
    to: '/em-training/category-course',
    displayName: 'Danh mục khóa học',
  },
  EM_TRAINING_COURSE_LIST_ADD: {
    to: '/em-training/category-course/add',
    displayName: 'Tạo danh mục khóa học',
  },
  EM_TRAINING_COURSE_LIST_EDIT: {
    to: '/em-training/category-course/edit',
    displayName: 'Chỉnh sửa danh mục khóa học',
  },

  // Khóa học
  EM_TRAINING_COURSES: {
    to: '/em-training/courses',
    displayName: 'Khóa học',
  },
  EM_TRAINING_COURSES_ADD: {
    to: '/em-training/courses/add',
    displayName: 'Tạo khóa học',
  },

  // Exam
  EM_TRAINING_EXAM: {
    to: '/em-training/exam',
    displayName: 'Exam',
  },
  EM_TRAINING_EXAM_ADD: {
    to: '/em-training/exam/add',
    displayName: 'Tạo Exam',
  },
  // GCN
  EM_TRAINING_GCN: {
    to: '/em-training/gcn',
    displayName: 'Giấy chứng nhận',
  },
  EM_TRAINING_GCN_ADD: {
    to: '/em-training/gcn/add',
    displayName: 'Tạo Giấy chứng nhận',
  },
  // Academy
  EM_TRAINING_ACADEMY: {
    to: '/em-training/academy',
    displayName: 'Academy',
  },
};

const breadcrumbsEMBrandDictionary = {
  EM_BRAND: {
    to: '',
    displayName: 'EM-Brand',
  },
  EM_BRAND_REPORT: {
    to: '/em-brands/report',
    displayName: 'Report',
  },

  // Industry
  EM_BRAND_INDUSTRY: {
    to: '/em-brands/industry',
    displayName: 'Danh mục ngành hàng',
  },
  EM_BRAND_INDUSTRY_ADD: {
    to: '/em-brands/industry',
    displayName: 'Tạo danh mục ngành hàng',
  },

  // Product
  EM_BRAND_PRODUCT: {
    to: '/em-brands/product',
    displayName: 'Danh mục sản phẩm',
  },
  EM_BRAND_PRODUCT_ADD: {
    to: '/em-brands/product',
    displayName: 'Tạo danh mục sản phẩm',
  },

  // Management
  EM_BRAND_PURCHASE_MANAGEMENT: {
    to: '/em-brands/purchase-management',
    displayName: 'Quản lý bán hàng',
  },
  EM_BRAND_DISCOUNT_MANAGEMENT: {
    to: '/em-brands/discount-management',
    displayName: 'Quản lý chiết khấu',
  },
  EM_BRAND_ORDER_LIST_MANAGEMENT: {
    to: '/em-brands/order-list-management',
    displayName: 'Quản lý danh sách đơn hàng',
  },
  EM_BRAND_ORDER_REPORT_MANAGEMENT: {
    to: '/em-brands/order-report-management',
    displayName: 'Quản lý báo cáo đơn hàng',
  },
  EM_BRAND_PERSONAL_INFO_MANAGEMENT: {
    to: '/em-brands/personal-info-management',
    displayName: 'Quản lý thông tin cá nhân',
  },
  EM_BRAND_REWARDS_MANAGEMENT: {
    to: '/em-brands/personal-info-management',
    displayName: 'Quản lý điểm thưởng',
  },
};

const breadcrumbsEMRetailDictionary = {
  EM_RETAIL: {
    to: '',
    displayName: 'EM-Retail',
  },
  EM_RETAIL_REPORT: {
    to: '/em-retail/report',
    displayName: 'Report',
  },

  // Management
  EM_RETAIL_APPLY_FORM_MANAGEMENT: {
    to: '/em-retail/apply-form-management',
    displayName: 'Quản lý đơn apply',
  },

  // Store
  EM_RETAIL_STORE_MANAGEMENT: {
    to: '/em-retail/store-management',
    displayName: 'Quản lý cửa hàng',
  },
  EM_RETAIL_STORE_MANAGEMENT_ADD: {
    to: '/em-retail/store-management',
    displayName: 'Tạo cửa hàng',
  },
};

const breadcrumbsEMInnovationDictionary = {
  EM_INNOVATION: {
    to: '',
    displayName: 'EM-Innovation',
  },
  EM_INNOVATION_REPORT: {
    to: '/em-innovation/report',
    displayName: 'Report',
  },

  // Project
  EM_INNOVATION_PROJECT_MANAGEMENT: {
    to: '/em-innovation/project-management',
    displayName: 'Quản lý dự án',
  },
  EM_INNOVATION_PROJECT_MANAGEMENT_ADD: {
    to: '/em-innovation/project-management',
    displayName: 'Tạo dự án',
  },

  // Management
  EM_INNOVATION_PROJECT_OPERATIONS_MANAGEMENT: {
    to: '/em-innovation/project-operations-management',
    displayName: 'Quản lý hoạt động dự án',
  },
};

const breadcrumbsEMVoiceDictionary = {
  EM_VOICE: {
    to: '',
    displayName: 'EM-Voice',
  },

  // Honer member
  EM_VOICE_HONOR_MEMBER: {
    to: '/em-voice/honor-member',
    displayName: 'Thành viên Tôn vinh',
  },

  // Management
  EM_VOICE_EVENT_MANAGEMENT: {
    to: '/em-voice/event-management',
    displayName: 'Quản lý sự kiện',
  },
  EM_VOICE_EVENT_MANAGEMENT_ADD: {
    to: '/em-voice/event-management',
    displayName: 'Tạo sự kiện',
  },
  EM_VOICE_EVENT_MANAGEMENT_DETAIL: {
    to: '/em-voice/event-management',
    displayName: 'Chi tiết sự kiện',
  },
};

const breadcrumbsAccessControl = {
  ACCESS_CONTROL: {
    to: '',
    displayName: 'Access-control',
  },
  ACCESS_CONTROL_ACCOUNT_LIST: {
    to: '/access-control/account-list',
    displayName: 'Danh sách tài khoản',
  },
  ACCESS_CONTROL_ROLE_LIST: {
    to: '/access-control/role-list',
    displayName: 'Danh sách phân quyền',
  },
  ACCESS_CONTROL_DEPARTMENT: {
    to: '/access-control/department',
    displayName: 'Danh sách phòng ban',
  },
};

const breadcrumbsUIManagementDictionary = {
  UI_MANAGEMENT: {
    to: '',
    displayName: 'UI-Management'
  },
  UI_MANAGEMENT_HOME_BANNER: {
    to: '/ui-management/home-banner',
    displayName: "Quản lý Banner Trang chủ"
  },
  UI_MANAGEMENT_FUNCTION_BANNER: {
    to: '/ui-management/function-banner',
    displayName: "Quản lý Banner Chức năng"
  },
  UI_MANAGEMENT_ON_BOARD_BANNER: {
    to: '/ui-management/on-board',
    displayName: "Quản lý Banner On Boarding"
  }
};

const breadcrumbsDictionary = {
  ...breadcrumbsEMTrainingDictionary,
  ...breadcrumbsEMBrandDictionary,
  ...breadcrumbsEMRetailDictionary,
  ...breadcrumbsEMInnovationDictionary,
  ...breadcrumbsEMVoiceDictionary,
  ...breadcrumbsAccessControl,
  ...breadcrumbsUIManagementDictionary,
};

const genBreadcrumbs = (rootKey: any) => {
  const root = breadcrumbsDictionary[rootKey];
  return (...key: (keyof typeof breadcrumbsDictionary)[]) => {
    return [root, ...key.map((ele) => breadcrumbsDictionary[ele])];
  };
};

const breadcrumbsEMTraining = genBreadcrumbs('EM_TRAINING');
const breadcrumbsEMBrand = genBreadcrumbs('EM_BRAND');
const breadcrumbsEMRetail = genBreadcrumbs('EM_RETAIL');
const breadcrumbsEMInnovation = genBreadcrumbs('EM_INNOVATION');
const breadcrumbsEMVoice = genBreadcrumbs('EM_VOICE');
const breadcumbsAccessControl = genBreadcrumbs('ACCESS_CONTROL');
const breadcrumbsUIManagement = genBreadcrumbs("UI_MANAGEMENT");

const BREADCRUMBS_EM_TRAINING_DICTIONARY = {
  EM_TRAINING_REPORT: breadcrumbsEMTraining('EM_TRAINING_REPORT'),
  EM_TRAINING_COURSE_LIST: breadcrumbsEMTraining('EM_TRAINING_COURSE_LIST'),
  EM_TRAINING_COURSE_LIST_ADD: breadcrumbsEMTraining(
    'EM_TRAINING_COURSE_LIST',
    'EM_TRAINING_COURSE_LIST_ADD',
  ),
  EM_TRAINING_COURSE_LIST_EDIT: breadcrumbsEMTraining(
    'EM_TRAINING_COURSE_LIST',
    'EM_TRAINING_COURSE_LIST_EDIT',
  ),
  EM_TRAINING_COURSES: breadcrumbsEMTraining('EM_TRAINING_COURSES'),
  EM_TRAINING_COURSES_ADD: breadcrumbsEMTraining(
    'EM_TRAINING_COURSES',
    'EM_TRAINING_COURSES_ADD',
  ),
  EM_TRAINING_EXAM: breadcrumbsEMTraining('EM_TRAINING_EXAM'),
  EM_TRAINING_EXAM_ADD: breadcrumbsEMTraining(
    'EM_TRAINING_EXAM',
    'EM_TRAINING_EXAM_ADD',
  ),
  EM_TRAINING_GCN: breadcrumbsEMTraining('EM_TRAINING_GCN'),
  EM_TRAINING_GCN_ADD: breadcrumbsEMTraining(
    'EM_TRAINING_GCN',
    'EM_TRAINING_GCN_ADD',
  ),
  EM_TRAINING_ACADEMY: breadcrumbsEMTraining('EM_TRAINING_ACADEMY'),
  default: [],
};

const BREADCRUMBS_EM_BRAND_DICTIONARY = {
  EM_BRAND_REPORT: breadcrumbsEMBrand('EM_BRAND_REPORT'),
  EM_BRAND_INDUSTRY: breadcrumbsEMBrand('EM_BRAND_INDUSTRY'),
  EM_BRAND_INDUSTRY_ADD: breadcrumbsEMBrand(
    'EM_BRAND_INDUSTRY',
    'EM_BRAND_INDUSTRY_ADD',
  ),
  EM_BRAND_PRODUCT: breadcrumbsEMBrand('EM_BRAND_PRODUCT'),
  EM_BRAND_PRODUCT_ADD: breadcrumbsEMBrand(
    'EM_BRAND_PRODUCT',
    'EM_BRAND_PRODUCT_ADD',
  ),
  EM_BRAND_PURCHASE_MANAGEMENT: breadcrumbsEMBrand('EM_BRAND_PURCHASE_MANAGEMENT'),
  EM_BRAND_DISCOUNT_MANAGEMENT: breadcrumbsEMBrand('EM_BRAND_DISCOUNT_MANAGEMENT'),
  EM_BRAND_ORDER_LIST_MANAGEMENT: breadcrumbsEMBrand(
    'EM_BRAND_ORDER_LIST_MANAGEMENT',
  ),
  EM_BRAND_ORDER_REPORT_MANAGEMENT: breadcrumbsEMBrand(
    'EM_BRAND_ORDER_REPORT_MANAGEMENT',
  ),
  EM_BRAND_PERSONAL_INFO_MANAGEMENT: breadcrumbsEMBrand(
    'EM_BRAND_PERSONAL_INFO_MANAGEMENT',
  ),
  EM_BRAND_REWARDS_MANAGEMENT: breadcrumbsEMBrand('EM_BRAND_REWARDS_MANAGEMENT'),
};

const BREADCRUMBS_EM_RETAIL_DICTIONARY = {
  EM_RETAIL_REPORT: breadcrumbsEMRetail('EM_RETAIL_REPORT'),
  EM_RETAIL_APPLY_FORM_MANAGEMENT: breadcrumbsEMRetail(
    'EM_RETAIL_APPLY_FORM_MANAGEMENT',
  ),
  EM_RETAIL_STORE_MANAGEMENT: breadcrumbsEMRetail('EM_RETAIL_STORE_MANAGEMENT'),
  EM_RETAIL_STORE_MANAGEMENT_ADD: breadcrumbsEMRetail(
    'EM_RETAIL_STORE_MANAGEMENT_ADD',
  ),
};

const BREADCRUMBS_EM_INNOVATION_DICTIONARY = {
  EM_INNOVATION_REPORT: breadcrumbsEMInnovation('EM_INNOVATION_REPORT'),
  EM_INNOVATION_PROJECT_MANAGEMENT: breadcrumbsEMInnovation(
    'EM_INNOVATION_PROJECT_MANAGEMENT',
  ),
  EM_INNOVATION_PROJECT_MANAGEMENT_ADD: breadcrumbsEMInnovation(
    'EM_INNOVATION_PROJECT_MANAGEMENT',
    'EM_INNOVATION_PROJECT_MANAGEMENT_ADD',
  ),
  EM_INNOVATION_PROJECT_OPERATIONS_MANAGEMENT: breadcrumbsEMInnovation(
    'EM_INNOVATION_PROJECT_OPERATIONS_MANAGEMENT',
  ),
};

const BREADCRUMBS_EM_VOICE_DICTIONARY = {
  EM_VOICE_HONOR_MEMBER: breadcrumbsEMVoice('EM_VOICE_HONOR_MEMBER'),
  EM_VOICE_EVENT_MANAGEMENT: breadcrumbsEMVoice('EM_VOICE_EVENT_MANAGEMENT'),
  EM_VOICE_EVENT_MANAGEMENT_ADD: breadcrumbsEMVoice(
    'EM_VOICE_EVENT_MANAGEMENT',
    'EM_VOICE_EVENT_MANAGEMENT_ADD',
  ),
  EM_VOICE_EVENT_MANAGEMENT_DETAIL: breadcrumbsEMVoice(
    'EM_VOICE_EVENT_MANAGEMENT',
    'EM_VOICE_EVENT_MANAGEMENT_DETAIL'
  )
};

const BREADCRUMBS_ACCESS_CONTROL_DICTIONARY = {
  ACCESS_CONTROL: breadcumbsAccessControl('ACCESS_CONTROL'),
  ACCOUNT_LIST: breadcumbsAccessControl('ACCESS_CONTROL_ACCOUNT_LIST'),
  ROLE_LIST: breadcumbsAccessControl('ACCESS_CONTROL_ROLE_LIST'),
  DEPARTMENT_LIST: breadcumbsAccessControl('ACCESS_CONTROL_DEPARTMENT'),
};

const BREADCRUMBS_UI_MANAGEMENT_DICTIONARY = {
  HOME_BANNER: breadcrumbsUIManagement('UI_MANAGEMENT_HOME_BANNER'),
  FUNCTION_BANNER: breadcrumbsUIManagement('UI_MANAGEMENT_FUNCTION_BANNER'),
  ON_BOARD_BANNER: breadcrumbsUIManagement("UI_MANAGEMENT_ON_BOARD_BANNER"),
}

const BREADCRUMBS_DICTIONARY = {
  ...BREADCRUMBS_EM_TRAINING_DICTIONARY,
  ...BREADCRUMBS_EM_BRAND_DICTIONARY,
  ...BREADCRUMBS_EM_RETAIL_DICTIONARY,
  ...BREADCRUMBS_EM_INNOVATION_DICTIONARY,
  ...BREADCRUMBS_EM_VOICE_DICTIONARY,
  ...BREADCRUMBS_ACCESS_CONTROL_DICTIONARY,
  ...BREADCRUMBS_UI_MANAGEMENT_DICTIONARY,
};
