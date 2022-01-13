export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [{
    name: 'dashboard',
    displayName: 'menu.dashboard',
    meta: {
      iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
    },
  },
  // Patient Management
  {
    name: 'patient-management',
    displayName: 'Patient Management',
    meta: {
      iconClass: 'fa fa-user-plus',
    },
    disabled: true,
    children: [{
      name: 'patient-list',
      displayName: 'Patient List',
    },
    {
      name: 'patient-requestAppointmentList',
      displayName: 'Request Appointment List',
    },
    {
      name: 'patient-appointmentList',
      displayName: 'Appointment List',
    },
    {
      name: 'patient-screeningList',
      displayName: 'Screening List',
    },
    {
      name: 'patient-appointmentBooking',
      displayName: 'Book New Appointment',
    },
    {
      name: 'calendar_management',
      displayName: 'Appointment Calendar',
    },
    ],
  },

  // Intervention Management
  {
    name: 'intervention-management',
    displayName: 'Intervention Management',
    meta: {
      iconClass: 'fa fa-heartbeat',
    },
    disabled: true,
    children: [{
    },
    ],
  },

  // VON Management
  {
    name: 'VON-management',
    displayName: 'VON Management',
    meta: {
      iconClass: 'fa fa-users',
    },
    disabled: true,
    children: [{
    },
    ],
  },
  // SHARRP Management
  {
    name: 'SHHARP-management',
    displayName: 'SHHARP Management',
    meta: {
      iconClass: 'fa fa-frown-o',
    },
    disabled: true,
    children: [{
      name: 'shharp-list',
      displayName: 'SHHARP List',
    },
    ],
  },
  // Report Management
  {
    name: 'report-management',
    displayName: 'Report Management',
    meta: {
      iconClass: 'vuestic-iconset vuestic-iconset-files',
    },
    disabled: true,
    children: [{
    },
    ],
  },
  // System Setting
  {
    name: 'system-setting',
    displayName: 'System Setting',
    meta: {
      iconClass: 'vuestic-iconset vuestic-iconset-settings',
    },
    disabled: true,
    children: [{
      name: 'systemSetting',
      displayName: 'System Setting',
    },
    {
      name: 'generalSetting',
      displayName: 'General Setting',
    },
    {
      name: 'branchSetting',
      displayName: 'Branch Setting',
    },
    {
      name: 'icdSetting',
      displayName: 'ICD Setting',
    },
    {
      name: 'templateSetting',
      displayName: 'Template Setting',
    },
    {
      name: 'serviceSetting',
      displayName: 'Service Setting',
    },
    {
      name: 'programSetting',
      displayName: 'Program Setting',
    },
    {
      name: 'clubSetting',
      displayName: 'Club Setting',
    },
    {
      name: 'screenManagementSetting',
      displayName: 'Screen Management Setting',
    },
    {
      name: 'accessMatrixSetting',
      displayName: 'Access Matrix Setting',
    },
    {
      name: 'calendarSetting',
      displayName: 'Calendar Setting',
    },
    ],
  },
  // Occasion of Services
  {
    name: 'occassion-of-services',
    displayName: 'Occassion of Services',
    meta: {
      iconClass: 'fa fa-cogs',
    },
    disabled: true,
    children: [{
    },
    ],
  },
  // Library and References
  {
    name: 'library-and-references',
    displayName: 'Library and References',
    meta: {
      iconClass: 'fa fa-book',
    },
    disabled: true,
    children: [{
    },
    ],
  },
  {
    name: 'statistics',
    displayName: 'menu.statistics',
    meta: {
      iconClass: 'fa fa-times',
    },
    disabled: true,
    children: [{
      name: 'charts',
      displayName: 'menu.charts',
    },
    {
      name: 'progress-bars',
      displayName: 'menu.progressBars',
    },
    ],
  },
  {
    name: 'forms',
    displayName: 'menu.forms',
    meta: {
      iconClass: 'fa fa-times',
    },
    disabled: true,
    children: [{
      name: 'form-elements',
      displayName: 'menu.formElements',
    },
    {
      name: 'medium-editor',
      displayName: 'menu.mediumEditor',
    },
    ],
  },
  {
    name: 'tables',
    displayName: 'menu.tables',
    meta: {
      iconClass: 'fa fa-times',
    },
    children: [{
      name: 'markup',
      displayName: 'menu.markupTables',
    },
    {
      name: 'data',
      displayName: 'menu.dataTables',
    },
    ],
  },
  {
    name: 'ui',
    displayName: 'menu.uiElements',
    meta: {
      iconClass: 'fa fa-times',
    },
    disabled: true,
    children: [{
      name: 'buttons',
      displayName: 'menu.buttons',
    },
    {
      name: 'customButton',
      displayName: 'Customized Buttons',
    },
    {
      name: 'cards',
      displayName: 'menu.cards',
    },
    {
      name: 'chat',
      displayName: 'menu.chat',
    },
    {
      name: 'chips',
      displayName: 'menu.chips',
    },
    {
      name: 'collapses',
      displayName: 'menu.collapses',
    },
    {
      name: 'colors',
      displayName: 'menu.colors',
    },
    {
      name: 'color-pickers',
      displayName: 'menu.colorPickers',
    },
    {
      name: 'file-upload',
      displayName: 'menu.fileUpload',
    },
    {
      name: 'grid',
      displayName: 'menu.grid',
    },
    {
      name: 'icon-sets',
      displayName: 'menu.icons',
      children: [{
        displayName: 'concrete',
        name: 'icon-set',
      }],
    },
    {
      name: 'lists',
      displayName: 'menu.lists',
    },
    {
      name: 'modals',
      displayName: 'menu.modals',
    },
    {
      name: 'notifications',
      displayName: 'menu.notifications',
    },
    {
      name: 'popovers',
      displayName: 'menu.popovers',
    },
    {
      name: 'rating',
      displayName: 'menu.rating',
    },
    {
      name: 'sliders',
      displayName: 'menu.sliders',
    },
    {
      name: 'spacing',
      displayName: 'menu.spacing',
    },
    {
      name: 'spinners',
      displayName: 'menu.spinners',
    },
    {
      name: 'tabs',
      displayName: 'menu.tabs',
    },
    {
      name: 'timelines',
      displayName: 'menu.timelines',
    },
    {
      name: 'tree-view',
      displayName: 'menu.treeView',
    },
    {
      name: 'typography',
      displayName: 'menu.typography',
    },
    ],
  },
  {
    name: 'maps',
    displayName: 'menu.maps',
    meta: {
      iconClass: 'fa fa-times',
    },
    disabled: true,
    children: [{
      name: 'google-maps',
      displayName: 'Google Maps',
    },
    {
      name: 'yandex-maps',
      displayName: 'Yandex Maps',
    },
    {
      name: 'leaflet-maps',
      displayName: 'Leaflet Maps',
    },
    {
      name: 'bubble-maps',
      displayName: 'Bubble Maps',
    },
    {
      name: 'line-maps',
      displayName: 'Line Maps',
    },
    ],
  },
  {
    name: 'pages',
    displayName: 'menu.pages',
    meta: {
      iconClass: 'fa fa-times',
    },
    disabled: true,
    children: [{
      name: 'login',
      displayName: 'Login/Signup',
    },
    {
      name: '404-pages',
      displayName: '404 Pages',
    },
    ],
  },
  ],
}
